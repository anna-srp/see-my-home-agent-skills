# Complete Prompt for Codex / Claude Code

Copy everything below this line into a new conversation.

---

Build an English-language residential design visualization Agent for homeowners in the United States on ZooWork in the current project. Reproduce the core capabilities of See My Home, not its visual design.

The required default outcome is:

1. install and read the official ZooWork development skill;
2. ask me to configure only my ZooWork API key;
3. create or reuse one ZooWork Agent;
4. upload and attach the three home-design skills in this repository;
5. start the Agent and confirm that it is running on ZooWork Runtime;
6. run a small bounded smoke test;
7. report the usable Agent directly in the chat and ask whether I want a UI.

Do not turn this task into a documentation or QA project. Do not create an acceptance report, retry assessment, evidence bundle, Markdown deliverable, or other report file unless I explicitly request one. The Agent running successfully on ZooWork Runtime is the primary deliverable. A UI is an optional next step.

Default product definition:

- Agent name: See My Home
- Language: English only
- Market: United States only
- User-facing units: feet, inches, and square feet
- Core entry points: floor-plan layout, room-style visualization, and custom furniture design
- Safety boundary: conceptual design only; never claim structural, code, electrical, fabrication, or permit approval
- Privacy: uploaded home images are private current-task inputs by default
- UI preference: do not copy the demo's visual design; offer ZooWork App Kit or a custom UI only after the Runtime Agent is ready
- My additional requirements: none; requirements I add after this prompt take precedence

Treat English, the United States market, and US customary units as fixed product scope, not onboarding questions. Keep all user-facing Agent and UI copy in English.

Treat these files as the source of truth:

- `agent/AGENTS.md`
- `skills/home-layout-planning/SKILL.md`
- `skills/room-style-visualization/SKILL.md`
- `skills/custom-furniture-design/SKILL.md`

Follow this workflow in order.

## 0. Install and read the official ZooWork development skill

Before writing any ZooWork SDK call, run:

```bash
npx skills add SerendipityOneInc/zoowork-sdk-skills
```

Then read the complete `SKILL.md` for `zoowork-managed-agents`, its deployment reference, and any SDK or event-streaming reference needed for this implementation. If the official repository already exists locally, read it instead of installing again.

The official skill is for the development assistant. The three skills in this repository are uploaded and attached to the Agent running on ZooWork Runtime. Do not confuse these layers.

## 1. Ask for only the ZooWork API key

Check only whether `ZOOWORK_API_KEY` is configured. Do not print its value.

The API key is the only value I enter manually. Never ask me to find, copy, paste, or configure an Agent ID. ZooWork returns the Agent ID after creation; save and reuse it automatically.

If the key is missing, pause and ask me to:

1. sign in at <https://zoowork.ai/claw-settings?tab=account-api-keys>;
2. open `Settings → API Keys → Create API Key`;
3. create and immediately copy the one-time `zct_...` secret;
4. save it myself as `ZOOWORK_API_KEY` in a local `.env` file;
5. tell you when it is saved without pasting it into the chat.

Ensure `.env` is ignored by Git. The key must never enter a prompt, source file, frontend bundle, log, artifact, or Git history. Do not create, rotate, or delete the key on my behalf.

After I confirm it is saved, call `listModels()` as the smallest read-only validation. Report only whether validation succeeded and how many models are available.

## 2. Read the product definition and proceed

Read `agent/AGENTS.md` and all three skill entrypoints. Do not require a separate design-approval document when the repository already answers the implementation questions. Briefly state what you will provision, then proceed.

## 3. Create or reuse one Agent

Follow `zoowork-managed-agents` exactly:

- Use `@zoowork-ai/sdk`; do not guess package names or API shapes.
- Select a model from the actual `listModels()` response.
- Use `agent/AGENTS.md` as the Persona document.
- Check ignored local state and stable labels for an existing Agent. Never ask me for its ID.
- Call `createAgent()` only when the Agent genuinely does not exist, using a stable idempotency key.
- Save the returned `agent_id` in ignored server-side state such as `.zoowork/see-my-home-agent.json`.
- If a backend later expects `ZOOWORK_AGENT_ID`, populate it automatically from saved state.
- Never create an Agent inside a per-message request path.

## 4. Package, upload, and attach the three skills

Process:

- `home-layout-planning`
- `room-style-visualization`
- `custom-furniture-design`

For each skill:

1. verify that the directory name matches the `name` in `SKILL.md` frontmatter;
2. preserve that directory as the zip's top-level directory;
3. upload a new owned skill or add a version when the same owned skill already exists and changed;
4. attach it with the documented SDK method;
5. verify that it is attached, enabled, and eligible;
6. persist skill IDs and versions without storing secrets.

Do not re-upload global ZooWork catalog skills that a new Agent already receives automatically.

## 5. Publish the Agent to ZooWork Runtime

After the Persona and skills are attached, call the documented start method and `waitUntilRunning(agentId)`. Do not use `actual_state` as the API-readiness signal.

For this task, “published to ZooWork Runtime” means the persistent Agent exists, all three skills are attached, and `waitUntilRunning()` confirms `desired_state === 'running'`. This does not automatically create a public website.

## 6. Run a bounded smoke test

Run one routing test for each skill and confirm that the intended skill triggers. Keep every test in English and within United States residential context.

- For skills that require a user image, a correct private-input request is a valid routing smoke result; do not use a real personal home file.
- If a non-sensitive sample asset already exists, use it for at most one end-to-end image test.
- Otherwise, use one text-only furniture concept as the artifact-pipeline test when image credits are available.
- Make at most one corrective retry for a trigger or implementation defect.
- Do not repeatedly spend image credits to chase a perfect result.
- Treat insufficient credits or a temporary image-provider failure as an external limitation, not a reason to undo a healthy Runtime deployment.
- Keep concise results in the final chat response; do not generate report files.

A fatal Runtime blocker is an invalid key, an Agent that cannot reach `running`, a skill that cannot be attached or is ineligible, or a broken session path that prevents any conversation.

## 7. Finish with the Agent, not a Markdown file

When the Agent is running, respond directly with:

- a clear statement that See My Home is running on ZooWork Runtime;
- the automatically generated `agent_id`;
- the three attached skill names and status;
- a short smoke-test summary;
- any external limitation, without presenting it as the main deliverable;
- the exact next-step question: “Would you like me to build a UI for this Agent now? I can use ZooWork App Kit or adapt your existing frontend.”

Do not create or return an acceptance report unless I explicitly ask for one. If I do not want a UI, stop after delivering the running Agent status.

## 8. Build and deploy a UI only if I want one

If I ask for a UI:

- recommend ZooWork App Kit when I have no existing frontend or stack preference;
- otherwise adapt my existing frontend and keep ZooWork sessions and event handling on the backend;
- pin the UI to the automatically saved Agent ID and set `AGENT_PICKER=off`;
- keep `ZOOWORK_API_KEY` server-side only;
- keep every label, message, error, and empty state in English;
- use feet, inches, and square feet in the interface;
- support private uploads, multi-turn refinement, streaming, and refresh recovery;
- add authentication, user isolation, usage limits, rate limiting, and abuse controls in proportion to the intended audience;
- let the layout and brand be customized instead of copying the demo.

Preview and verify the UI locally. Before making it public or changing production access, ask for my explicit approval. After approval, deploy it and return the actual URL rather than a report file.

The final product flow is: skills attached → Agent running on ZooWork Runtime → direct usable-status response → optional UI choice → optional UI deployment.

---
