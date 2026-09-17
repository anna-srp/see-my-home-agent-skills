# See My Home Agent Skills

A portable, English-language Skill pack distilled from the core capabilities of [See My Home](https://see-my-home.vercel.app/) for United States homeowners. It provides the capability layer without copying the site's visual design.

## Fast start

1. Clone this repository and open it in Codex or Claude Code.
2. Copy the complete contents of [PROMPT.md](PROMPT.md) into a new conversation.
3. Create a ZooWork API key, save it in a local ignored `.env` file, and tell the assistant when it is ready. Never paste it into chat.
4. The assistant runs the checked-in setup and reports the running Agent directly in chat.
5. Choose whether to try a real design request, customize the workflow, or build a UI.

The API key is the only value entered manually. The Agent ID is created, stored, and reused automatically.

## Fast setup versus real use

| Mode | What it does | When to use it |
|---|---|---|
| Fast setup | Incremental deployment plus one text-only furniture specification | Default installation |
| Real request | Floor-plan, room-style, or furniture visualization | First actual use |
| Full acceptance test | Exercises a bounded image-generation path | Only when explicitly requested |

Fast setup does not request a home image or generate visual media. The quick Runtime turn has a two-minute hard budget. Image generation is deferred until it produces something the user actually wants.

## Included automation

```bash
npm ci
npm run setup
```

The commands are also available separately:

```bash
npm run deploy  # create/reuse the Agent and reconcile only changed Skills
npm run verify  # one text-only custom-furniture specification
```

Ignored `.zoowork/` state stores Agent and Skill IDs, content hashes, versions, and the last verification result. It stores no API key. Repeated deployment skips unchanged Skill uploads.

## Included Skills

| User intent | Runtime Skill | Purpose |
|---|---|---|
| Furnish or analyze a floor plan | `home-layout-planning` | Confirms geometry, plans furniture, validates circulation, and visualizes the layout |
| Restyle a room photo | `room-style-visualization` | Preserves architecture and camera while changing authorized design layers |
| Develop a furniture concept | `custom-furniture-design` | Creates a coherent specification, concept render, and optional orthographic views |

## Boundaries

- All user-facing conversation and UI copy are English only.
- The market is the United States; user-facing dimensions use feet, inches, and square feet.
- Uploaded home images are private current-task inputs by default.
- Results are conceptual, not structural, code, electrical, permit, fabrication, or fit approval.
- Never silently change source architecture, geometry, camera perspective, or locked details.
- `zoowork-managed-agents` belongs in the development assistant; the three repository Skills belong on the Runtime Agent.
- ZooWork Runtime does not automatically create a public website. A UI is optional.

## Repository structure

```text
.
├── PROMPT.md
├── package.json
├── scripts/
│   ├── provision.mjs
│   └── verify.mjs
├── agent/AGENTS.md
└── skills/
    ├── home-layout-planning/
    ├── room-style-visualization/
    └── custom-furniture-design/
```

## References

- [Live demo](https://see-my-home.vercel.app/)
- [Public product source](https://github.com/QingMXL/See-My-Home)
- [ZooWork Agent creation and public-release guide](https://starquest.feishu.cn/docx/AxJAd0dPDoWYIVxWQ9Xc2AjFndh)
- [ZooWork SDK Skills](https://github.com/SerendipityOneInc/zoowork-sdk-skills)
