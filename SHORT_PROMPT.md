Build, verify, and publicly deploy the English-language, United States See My Home Agent using <https://github.com/anna-srp/see-my-home-agent-skills>.

Open or clone the repository, read its `README.md`, `PROMPT.md`, Agent persona, and three Skills, and follow the official `zoowork-managed-agents` guidance. Ask me only to save `ZOOWORK_API_KEY` in the ignored `.env`; never ask for an Agent ID or Skill ID. Run `npm ci && npm run setup`; keep the quick test text-only and under two minutes.

After setup passes, do not stop or ask whether I want a UI. Reuse the same Agent and build a lightweight, original See My Home web UI with a design-brief box, example prompts, a streaming conversation/results view, loading and error states, and New conversation. Keep the API key and Agent ID server-side, create a separate Session for each visitor or conversation, add a basic usage limit, accept only text or authorized public URLs in the MVP, and deploy it to Vercel. Do not add login, an admin panel, billing, or a dashboard unless required. If Vercel needs interactive login, ask only for that authorization and continue.

Finish in chat with the running Agent status, quick-test result, public Vercel URL, UI test result, and verified upload status. Do not substitute a Markdown report for the Agent and deployed app.

My additional requirements: [add changes here, or leave as none].
