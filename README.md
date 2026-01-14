# Repomix Issue #1060 Reproduction

This repository reproduces the test case from [Issue #1060](https://github.com/yamadashy/repomix/issues/1060).

## How to test

```bash
npm install
node test.mjs
```

## Expected Results

After running `node test.mjs`, check both output files:

### repomix-output.json (Repomix output file)

```bash
jq 'keys' repomix-output.json
# Expected: ["directoryStructure"]
# No "files" key - this is correct behavior when files: false
```

### debug-pack-result.json (Return value of runCli)

```bash
jq '.packResult | keys' debug-pack-result.json
# Expected: ["fileCharCounts", "fileTokenCounts", ..., "processedFiles", ...]
# processedFiles always contains file contents (for metrics/analysis)
```

## Summary

- `files: false` only affects the **output file** (`repomix-output.json`)
- The return value of `runCli()` (`result.packResult.processedFiles`) always contains file contents
