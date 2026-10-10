import assert from "node:assert/strict";
import { resolveDataAdapterMode } from "./data-adapter";

assert.equal(resolveDataAdapterMode("mock", false), "mock");
assert.equal(resolveDataAdapterMode("mock", true), "mock");
assert.equal(resolveDataAdapterMode("api", false), "api");
assert.equal(resolveDataAdapterMode("api", true), "api");

assert.equal(resolveDataAdapterMode(undefined, false), "mock");
assert.equal(resolveDataAdapterMode("", false), "mock");
assert.equal(resolveDataAdapterMode(undefined, true), "api");
assert.equal(resolveDataAdapterMode("   ", true), "api");

assert.throws(
  () => resolveDataAdapterMode("django", true),
  /Unsupported VITE_DATA_ADAPTER/,
);
assert.throws(
  () => resolveDataAdapterMode("unexpected", false),
  /Unsupported VITE_DATA_ADAPTER/,
);

console.log("data-adapter checks passed");
