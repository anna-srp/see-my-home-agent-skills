# Fast Setup Prompt for Codex / Claude Code

Copy everything below this line into a new conversation.

---

Build and deploy See My Home, an English-language residential design visualization Agent for United States homeowners, on ZooWork Runtime using this repository:

<https://github.com/anna-srp/see-my-home-agent-skills>

The default mode is **fast setup**, not full image acceptance testing. The required outcome is one persistent ZooWork Agent with all three repository Skills attached, running, and verified by one lightweight text-only Runtime turn. Do not request a private home image or generate a sample image during setup. Do not build a UI unless I ask after the Runtime Agent is ready.

## Fixed product scope

- Agent name: See My Home
- Language: English only
- Market: United States only
- User-facing units: feet, inches, and square feet
- Entry points: floor-plan layout, room-style visualization, and custom furniture design
- Safety: conceptual design only; never claim structural, code, electrical, permit, or fabrication approval
- Privacy: uploaded home images are private current-task inputs by default
- UI: optional and separate from Runtime deployment; never copy the reference site's protected visual design
- Additional requirements I give after this prompt take precedence

## 1. Open the repository

Use the existing local repository when present. Otherwise clone it once and work from its root. Read `README.md`, `agent/AGENTS.md`, and every `skills/*/SKILL.md` entrypoint.

## 2. Load the official ZooWork development Skill

Before making ZooWork calls, use the official `zoowork-managed-agents` development Skill from <https://github.com/SerendipityOneInc/zoowork-sdk-skills>. If it is already installed, read and use that copy. Do not clone or reinstall it merely to check for updates. If it is missing, install it once and follow its required deployment guidance.

The official development Skill teaches Codex or Claude how to deploy. The three home-design Skills in this repository are what run on the ZooWork Agent.

## 3. Ask me for only the ZooWork API key

Check whether `ZOOWORK_API_KEY` is available in the process environment or this repository's local `.env` file. Never print its value.

If it is missing, ask me to sign in at <https://zoowork.ai/claw-settings?tab=account-api-keys>, create and copy the one-time `zct_...` secret, save it myself as `ZOOWORK_API_KEY` in the ignored `.env` file, and tell you when it is ready without pasting it into chat.

The API key is the only value I enter manually. Never ask me for an Agent ID. The setup stores the generated ID in ignored `.zoowork/` state. Keep the key out of prompts, source files, logs, artifacts, frontend bundles, and Git history.

## 4. Run the checked-in fast setup

After the key is available, run:

```bash
npm ci
npm run setup
```

Use this automation instead of writing a new deployment harness. Do not run `npm view`, browse package registries, inspect the entire SDK declaration file, or create replacement setup scripts unless the command fails with a concrete compatibility error.

`npm run setup` must:

1. validate the key with the read-only model catalog;
2. create or reuse one persistent Agent using saved state, stable labels, and an idempotency key;
3. package all three Skills correctly and upload only new or changed versions;
4. attach only missing Skills and verify that all three are enabled and eligible;
5. start the Agent only when needed and use the documented helper to wait for `desired_state === 'running'`;
6. run one English, United States, text-only furniture-specification turn that confirms `custom-furniture-design` triggers;
7. stop before image generation, orthographic views, web access, dependency installation, or artifact publication.

The quick Runtime verification has a two-minute budget. If it fails, diagnose that failure only. Do not silently escalate into image generation or create repeated sessions.

## 5. Finish directly in chat

When setup succeeds, report:

- that See My Home is running on ZooWork Runtime;
- the automatically generated Agent ID;
- all three attached Skill names and enabled/eligible status;
- the quick verification result and elapsed time;
- that no private home image was processed and no image generation credits were spent;
- this exact question: “Would you like to try a real home-design request now, customize the workflow, or build a UI for this Agent?”

Do not create an acceptance report, retry assessment, evidence bundle, or Markdown deliverable. The running Agent is the deliverable.

## 6. Full visual testing is opt-in

Do not generate sample rooms, plans, or furniture during installation. Exercise visual generation only when I explicitly request a full acceptance test or provide a real authorized design task. Keep uploads private, launch at most one generation job per requested view, wait for the actual completion event, inspect source preservation, and make at most one targeted correction. Explain beforehand that image generation can add several minutes and may spend image credits.

## 7. UI is opt-in

If I ask for a UI, recommend ZooWork App Kit when I have no frontend preference; otherwise adapt my frontend. Keep the API key server-side, pin the saved Agent ID automatically, set `AGENT_PICKER=off`, and keep all copy in English with US customary units. Support private uploads, multi-turn sessions, refresh recovery, authentication, user isolation, rate limits, and usage limits. Preview locally and ask for approval before public deployment.

The intended flow is: API key → fast incremental setup → running Runtime Agent → one text-only verification → optional real design request, customization, or UI.
