# cron-doctor

> 🕒 Readable, safe cron jobs for humans.

This is the **seed release** to secure the `cron-doctor` name on npm.  
The initial API is minimal and will expand to include:

- Explain any cron (plain English)
- Validate & lint (syntax + risky patterns + DST)
- Convert between cron formats (5/6/7 fields; Quartz)
- Next-run previews (timezone-aware)
- A tiny DSL (`weekdays at 9am`)

## Quick start

```bash
npm i cron-doctor
# or
npx cron-doctor humanize "0 */10 * * * *" --tz America/New_York
```
