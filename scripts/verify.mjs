import { readFile, writeFile } from 'node:fs/promises'
import path from 'node:path'
import {
  ZooworkError,
  assistantText,
  createZooworkClient,
  isRunFinished,
  runOutcome,
  toolCall,
} from '@zoowork-ai/sdk'

const root = process.cwd()
const statePath = path.join(root, '.zoowork', 'see-my-home-agent.json')
const verificationPath = path.join(root, '.zoowork', 'see-my-home-verification.json')
const expectedSkill = 'custom-furniture-design'

async function loadEnv() {
  if (process.env.ZOOWORK_API_KEY?.startsWith('zct_')) return

  const raw = await readFile(path.join(root, '.env'), 'utf8')
  const line = raw.split(/\r?\n/).find((entry) => entry.startsWith('ZOOWORK_API_KEY='))
  if (!line) throw new Error('ZOOWORK_API_KEY is missing from .env')
  let value = line.slice('ZOOWORK_API_KEY='.length).trim()
  if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
    value = value.slice(1, -1)
  }
  if (!value.startsWith('zct_')) throw new Error('ZOOWORK_API_KEY in .env is not a zct_ key')
  process.env.ZOOWORK_API_KEY = value
}

function usedExpectedSkill(calls) {
  const input = calls.map((call) => JSON.stringify(call.args ?? {})).join('\n')
  return input.includes(`/skills/${expectedSkill}/`) || input.includes(`${expectedSkill}/SKILL.md`)
}

async function streamVerification(zc, agentId, sessionId, budgetMs = 120_000) {
  const deadline = Date.now() + budgetMs
  const calls = []
  let cursor
  let response = ''

  for (let attempt = 0; attempt < 4 && Date.now() < deadline; attempt += 1) {
    const controller = new AbortController()
    const timer = setTimeout(() => controller.abort(), Math.max(1, deadline - Date.now()))

    try {
      for await (const event of zc.streamEvents(agentId, sessionId, {
        ...(cursor ? { cursor } : {}),
        signal: controller.signal,
      })) {
        cursor = event.cursor ?? cursor
        response += assistantText(event)
        const call = toolCall(event)
        if (call?.phase === 'start') calls.push(call)

        if (isRunFinished(event)) {
          return {
            outcome: runOutcome(event),
            response: response.trim(),
            calls,
          }
        }
      }
    } catch (error) {
      if (error instanceof ZooworkError && error.status >= 400 && error.status < 500) throw error
      if (Date.now() >= deadline) throw error
    } finally {
      clearTimeout(timer)
      controller.abort()
    }

    if (Date.now() < deadline) {
      await new Promise((resolve) => setTimeout(resolve, Math.min(1_000 * 2 ** attempt, 5_000)))
    }
  }

  throw new Error('Quick verification did not finish within 120 seconds')
}

await loadEnv()
const state = JSON.parse(await readFile(statePath, 'utf8'))
if (!state.agentId) throw new Error('Run npm run deploy before npm run verify')

const zc = createZooworkClient()
await zc.waitUntilRunning(state.agentId, { timeoutMs: 60_000 })

const runKey = `see-my-home-quick-check-${Date.now()}`
const session = await zc.createSession(state.agentId, {
  initial_events: [{
    type: 'user.message',
    idempotency_key: `${runKey}-verify`,
    content: [
      "This is a fast deployment verification for an English-language United States residential design Agent.",
      "Before answering, open and read the custom-furniture-design skill file (custom-furniture-design/SKILL.md) and follow its specification structure in your reply.",
      "Draft only a concept specification for a 60-inch-wide, 30-inch-deep, 29-inch-high dining table with a solid white-oak top, rounded corners, and two black powder-coated steel trestle bases.",
      "Include intended use, component inventory, materials, locked dimensions, and unresolved fabrication assumptions.",
      "Do not generate or edit an image, create orthographic views, access the web, install dependencies, or claim fabrication readiness.",
    ].join('\n'),
  }],
  metadata: { origin: 'see-my-home-quick-verification' },
}, runKey)

const startedAt = Date.now()
const turn = await streamVerification(zc, state.agentId, session.session_id)
if (turn.outcome !== 'succeeded') throw new Error(`Quick verification ended with ${turn.outcome}`)
if (!usedExpectedSkill(turn.calls)) {
  throw new Error(`Runtime replied but did not consult ${expectedSkill}`)
}
if (!turn.response) throw new Error('Runtime verification returned no assistant response')

const result = {
  status: 'passed',
  mode: 'quick-no-render',
  agentId: state.agentId,
  sessionId: session.session_id,
  verifiedSkill: expectedSkill,
  renderedMedia: false,
  durationMs: Date.now() - startedAt,
  completedAt: new Date().toISOString(),
}

await writeFile(verificationPath, `${JSON.stringify(result, null, 2)}\n`, { mode: 0o600 })
console.log(JSON.stringify(result, null, 2))
