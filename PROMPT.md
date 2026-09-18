# Build, Verify, and Publicly Deploy See My Home

Copy everything below this line into a new Codex or Claude Code conversation.

---

Build and publicly deploy See My Home, an English-language residential design visualization Agent for United States homeowners, using:

<https://github.com/anna-srp/see-my-home-agent-skills>

The required outcome is one persistent ZooWork setup Agent with all three repository Skills attached, one lightweight text-only Runtime verification, an original home-design UI connected through a secure backend, and a working publicly accessible URL. Do not stop after Runtime setup or ask whether I want a UI. Build and deploy it immediately after verification. Do not request a private home image or generate sample media during setup.

## Fixed product scope

- Product: See My Home
- Language: English only
- Market: United States only
- User-facing units: feet, inches, and square feet
- Entry points: floor-plan layout, room-style visualization, and custom furniture design
- Safety: conceptual design only; never claim structural, code, electrical, permit, fabrication, or fit approval
- Privacy: home images are private current-task inputs unless the user explicitly consents otherwise
- UI: required and original; do not copy the reference site's protected design
- Additional requirements I provide after this prompt take precedence

## 1. Open the repository

Use the existing local repository when present. Otherwise clone it once and work from its root. Read `README.md`, `agent/AGENTS.md`, and all three `skills/*/SKILL.md` entrypoints.

## 2. Load official ZooWork guidance

Before making ZooWork calls, use the installed `zoowork-managed-agents` Skill or install it once from <https://github.com/SerendipityOneInc/zoowork-sdk-skills> if missing. Do not reinstall it only to check for updates. Read the current `app-kit/README.md` in <https://github.com/SerendipityOneInc/zoowork-quickstarts> before adapting the UI foundation.

The development Skill teaches the coding assistant how to deploy. The three home-design Skills in this repository run on the ZooWork Agent.

## 3. Ask me for only the ZooWork API key

Check the environment and ignored `.env` for `ZOOWORK_API_KEY`. Never print it. If missing, ask me to sign in at <https://zoowork.ai/claw-settings?tab=account-api-keys>, create a `zct_...` key, save it myself as `ZOOWORK_API_KEY` in `.env`, and tell you when it is ready without pasting it into chat.

Never ask me for an Agent ID or Skill ID. Setup creates or discovers the Agent and stores identifiers in ignored `.zoowork/` state. Keep the key out of source, logs, artifacts, browser bundles, and Git history.

## 4. Run the fast incremental setup

```bash
npm ci
npm run setup
```

Use the checked-in automation. Do not browse package registries or replace the provisioning scripts unless this command fails with a concrete compatibility error.

Setup must validate the key, create or reuse one persistent Agent, upload only changed Skill versions, attach only missing Skills, verify that all three are enabled and eligible, start the Agent when needed, wait for `desired_state === 'running'`, and run one English, United States, text-only furniture-specification turn that proves `custom-furniture-design` was consulted.

The quick verification has a two-minute budget. Do not generate images, request orthographic views, access the web, install dependencies, or publish artifacts. Diagnose a failure without silently escalating into image generation or repeated sessions.

## 5. Build the public UI immediately

Continue automatically after verification. Use ZooWork App Kit as the backend and streaming foundation unless a stronger compatible frontend already exists. Preserve its authentication, D1 ownership records, Durable Object execution, refresh-safe streaming, and server-only credential boundary. Build an original product experience with:

- clear floor-plan, room-style, and custom-furniture entry points;
- forms for dimensions, constraints, style, budget, locked details, and desired output;
- United States customary-unit input and display;
- multi-turn design history and generation progress that survive refresh;
- source-versus-proposed comparison and explicit conceptual-design disclaimers;
- result artifact status and direct image download when a real visual request completes; and
- loading, reconnect, error, quota, and generation-unavailable states.

For public deployment:

- set `AGENT_PICKER=off`;
- keep `ZOOWORK_API_KEY` only in a server-side secret store;
- keep Agent and Skill IDs out of browser code and never ask the user to enter them;
- use App Kit's per-user Agent mode, store user-to-Agent and session ownership in D1, and attach all three org Skills from generated server-side deployment state;
- never share one agent-scope `/workspace` across unrelated users;
- use Cloudflare Access or equivalent real authentication and never use `DEV_EMAIL` in production;
- enforce rate limits, usage limits, bounded retries, and per-user authorization; and
- do not claim native ZooWork session uploads work: they are not production-wired. Ship a text-first public MVP, and enable private home-image upload only after a signed, expiring object-storage bridge is end-to-end verified and temporary objects are deleted.

Preview locally and run a text-only UI smoke test, then deploy to an already authenticated provider or use App Kit's Cloudflare Workers path. This prompt already authorizes deployment; do not ask whether to publish. If interactive hosting login is required, ask me only to complete that authorization and continue.

Verify that the public URL loads, authentication is active, a new conversation streams correctly, refresh restores it, session ownership is enforced, and no ZooWork secret appears in client assets or network responses.

## 6. Keep visual testing opt-in

Do not generate sample rooms, plans, or furniture during installation or UI deployment. Exercise visual generation only for a real authorized design task or an explicitly requested full acceptance test. Keep uploads private, launch at most one generation job per requested view, wait for actual completion, inspect source preservation, and make at most one targeted correction. Explain beforehand that image generation can add time and spend credits.

## 7. Finish directly in chat

Return the running setup Agent ID; all three attached Skill names and enabled/eligible status; quick-verification result and elapsed time; confirmation that setup processed no private home image and spent no image credits; the public URL and authentication mode; the UI smoke-test result; and any verified first-release limitation, especially private image upload status.

Do not create an acceptance report, retry assessment, evidence bundle, or Markdown deliverable instead of the product. The running Agent and public URL are the deliverables.

The intended flow is: API key → fast incremental setup → one text-only verification → secure home-design UI → public URL.
