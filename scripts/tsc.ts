#!/usr/bin/env TS_NODE_COMPILER_OPTIONS={"module":"commonjs"} yarn -s ts-node
import concurrently, { CommandObj, Options } from "concurrently";
import glob from "glob";
import { basename, dirname } from "path";
import { chdir } from "process";
// import { randomColor } from ".";

const watch = process.argv.includes("--watch");
const parallel = watch;

// Fastest time & best config:
// - using incremental build (watch-incremental is ~20% slower than
//   watch-non-incremental, thus acceptable)
// - for the full build, use -b
// - for watch, use WITHOUT -b (much faster, ~0.5s without -b vs. 3s with -b)
// Seems related: https://github.com/microsoft/TypeScript/issues/31932

chdir(`${__dirname}/..`);

const options: Options = {
  killOthers: ["failure"],
  prefix: "[{time} {name}]",
  timestampFormat: "mm:ss.S",
};

let commands: CommandObj[] = [];
if (!parallel) {
  commands.push({
    command: "tsc -b --preserveWatchOutput",
    name: "tsc",
    prefixColor: "yellow",
  });
}
for (const src of glob.sync("packages/*/src")) {
  if (parallel) {
    const dir = dirname(src);
    commands.push({
      command:
        `tsc --preserveWatchOutput --project '${dir}/tsconfig.json'` +
        (watch ? " --watch" : ""),
      name: basename(dir),
    //   prefixColor: randomColor(),
    });
  }
  // Copy all files BUT *.ts and *.tsx (which will be turned into JS by TS).
  // Notice that we include *.d.ts, they're perfectly valid to copy.
  commands.push({
    command:
      `cpx '${src}/**/{*.d.ts,!(*.ts|*.tsx)}' '${src}/../dist'` +
      (watch ? " --watch" : ""),
    name: "cpx",
  });
}

concurrently(commands, options).catch(() => process.exit(1));