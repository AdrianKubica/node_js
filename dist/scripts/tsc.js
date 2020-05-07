#!/usr/bin/env TS_NODE_COMPILER_OPTIONS={"module":"commonjs"} yarn -s ts-node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var concurrently_1 = __importDefault(require("concurrently"));
var glob_1 = __importDefault(require("glob"));
var path_1 = require("path");
var process_1 = require("process");
// import { randomColor } from ".";
var watch = process.argv.includes("--watch");
var parallel = watch;
// Fastest time & best config:
// - using incremental build (watch-incremental is ~20% slower than
//   watch-non-incremental, thus acceptable)
// - for the full build, use -b
// - for watch, use WITHOUT -b (much faster, ~0.5s without -b vs. 3s with -b)
// Seems related: https://github.com/microsoft/TypeScript/issues/31932
process_1.chdir(__dirname + "/..");
var options = {
    killOthers: ["failure"],
    prefix: "[{time} {name}]",
    timestampFormat: "mm:ss.S",
};
var commands = [];
if (!parallel) {
    commands.push({
        command: "tsc -b --preserveWatchOutput",
        name: "tsc",
        prefixColor: "yellow",
    });
}
for (var _i = 0, _a = glob_1.default.sync("packages/*/src"); _i < _a.length; _i++) {
    var src = _a[_i];
    if (parallel) {
        var dir = path_1.dirname(src);
        commands.push({
            command: "tsc --preserveWatchOutput --project '" + dir + "/tsconfig.json'" +
                (watch ? " --watch" : ""),
            name: path_1.basename(dir),
        });
    }
    // Copy all files BUT *.ts and *.tsx (which will be turned into JS by TS).
    // Notice that we include *.d.ts, they're perfectly valid to copy.
    commands.push({
        command: "cpx '" + src + "/**/{*.d.ts,!(*.ts|*.tsx)}' '" + src + "/../dist'" +
            (watch ? " --watch" : ""),
        name: "cpx",
    });
}
concurrently_1.default(commands, options).catch(function () { return process.exit(1); });
