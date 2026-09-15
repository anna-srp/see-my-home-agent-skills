# See My Home Agent Skills

A portable, English-language skill pack distilled from the core capabilities of [See My Home](https://see-my-home.vercel.app/) for homeowners in the United States. It does not reproduce the site's visual design. It provides the capability layer that Codex, Claude Code, or another coding agent can install on ZooWork Runtime and later connect to any UI.

## Quick start

1. Clone this repository and open it in Codex or Claude Code.
2. Copy the complete contents of [PROMPT.md](PROMPT.md) into a new conversation.
3. Sign in to ZooWork, create an API key under `Settings → API Keys`, and save it yourself in a local `.env` file. The API key is the only value you enter manually; never paste it into the chat.
4. Let the coding agent create the Agent, automatically save its returned `agent_id`, upload and attach the three skills, start it on ZooWork Runtime, and run a bounded smoke test.
5. Receive the running Agent status directly in the chat. The coding agent will then ask whether you want a UI.

## Expected outcome

The default deliverable is a persistent See My Home Agent running on ZooWork Runtime with all three skills attached. The setup assistant reports the Agent ID, skill status, and smoke-test result directly in the conversation. It must not replace the Agent with an acceptance-report Markdown file.

ZooWork Runtime hosts the Agent and its skills; it does not automatically create a public website. A UI is optional and should be designed and deployed only after the Runtime Agent is ready and the user approves that next step.

## Included skills

| User intent | Runtime skill | Purpose |
|---|---|---|
| Turn a floor plan into a usable furnished layout | `home-layout-planning` | Maps rooms, confirms geometry, plans furniture, validates circulation, and produces a source-locked visualization |
| Restyle a real room photo | `room-style-visualization` | Applies a selected style or reference while preserving architecture, camera, and room identity |
| Turn a sketch, reference, or brief into furniture | `custom-furniture-design` | Produces a coherent concept render and optional orthographic concept views |

These are the three primary entry points. UI components, account systems, design galleries, and deployment configuration are deliberately outside the core skill pack.

## Repository structure

```text
.
├── PROMPT.md
├── agent/
│   └── AGENTS.md
└── skills/
    ├── home-layout-planning/
    ├── room-style-visualization/
    └── custom-furniture-design/
```

Every skill directory name matches the `name` in its `SKILL.md` frontmatter so it can be packaged, uploaded, and attached using ZooWork's skill zip rules.

## Two different kinds of skill

- `zoowork-managed-agents` is installed into a development assistant such as Codex or Claude Code. It teaches the assistant how to use the ZooWork SDK correctly.
- The home-design skills under this repository's `skills/` directory are uploaded and attached to the See My Home Agent running on ZooWork Runtime.

Install the official development skill first:

```bash
npx skills add SerendipityOneInc/zoowork-sdk-skills
```

Then load `zoowork-managed-agents` before working with ZooWork. Do not guess SDK calls from another Agent platform.

## Important boundaries

- Keep `ZOOWORK_API_KEY` only in a server-side environment variable or ignored local `.env` file. It must never enter a prompt, log, frontend bundle, or Git history.
- Users enter only `ZOOWORK_API_KEY`. They must never be asked to find, copy, or configure an Agent ID.
- All user-facing conversation and UI copy must be in English.
- The product is for the United States market. Use feet, inches, and square feet in user-facing output, while preserving exact source dimensions when supplied.
- Uploaded home images are private current-task inputs by default. Ask users to remove people, addresses, documents, screens, and personal photos before upload.
- Never infer wall removability, load-bearing status, code compliance, structural safety, electrical safety, or fabrication readiness from an image.
- Generated plans and room images are design visualizations, not measurements, permits, engineering drawings, or guarantees of construction feasibility.
- Never silently change source architecture, room boundaries, openings, camera perspective, or locked furniture details for visual appeal.

## References

- [Live demo](https://see-my-home.vercel.app/)
- [Public product source](https://github.com/QingMXL/See-My-Home)
- [ZooWork Agent creation and public-release guide](https://starquest.feishu.cn/docx/AxJAd0dPDoWYIVxWQ9Xc2AjFndh)
- [ZooWork SDK skills](https://github.com/SerendipityOneInc/zoowork-sdk-skills)
