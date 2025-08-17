#!/usr/bin/env node
import { humanize, validate, next, normalize } from "./index.js";

const [, , cmd, ...args] = process.argv;

function flag(name, fallback) {
  const i = args.findIndex((a) => a === `--${name}`);
  return i >= 0 ? args[i + 1] : fallback;
}

function usage() {
  console.log(`cronx (seed)
Usage:
  cronx humanize "<expr>" [--tz America/New_York]
  cronx validate "<expr>" [--tz ZONE]
  cronx next "<expr>" [--limit 5]
  cronx normalize "<expr>" --to standard-5|standard-6|quartz-7
`);
}

async function main() {
  if (!cmd || cmd === "help" || cmd === "--help" || cmd === "-h")
    return usage();

  if (cmd === "humanize") {
    const expr = args[0];
    const tz = flag("tz");
    if (!expr) return usage();
    console.log(humanize(expr, { tz }));
    return;
  }

  if (cmd === "validate") {
    const expr = args[0];
    const tz = flag("tz");
    if (!expr) return usage();
    const res = validate(expr, { tz });
    res.issues.forEach((i) =>
      console.log(`${i.severity.toUpperCase()} ${i.code}: ${i.message}`)
    );
    process.exit(res.ok ? 0 : 1);
    return;
  }

  if (cmd === "next") {
    const expr = args[0];
    const limit = Number(flag("limit", "3"));
    if (!expr) return usage();
    next(expr, { limit }).forEach((d) => console.log(d.toISOString()));
    return;
  }

  if (cmd === "normalize") {
    const expr = args[0];
    const to = flag("to");
    if (!expr || !to) return usage();
    console.log(normalize(expr, { toDialect: to }));
    return;
  }

  usage();
}

main().catch((e) => {
  console.error(e);
  process.exit(2);
});
