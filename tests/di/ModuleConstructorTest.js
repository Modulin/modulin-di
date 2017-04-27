import { suite, test, equal, isTrue } from "assert";
import ModuleConstructor from "di/ModuleConstructor";

suite("ModuleConstructor", () => {
  class Test {
    constructor(args) {
      this.args = args;
    }
  }
  const registry = { get: () => Test };
  const args = { get: () => ({}) };
  const cache = { add: () => {} };

  test("missing from registry", () => {
    const registry = { get: () => {} };

    const constructor = new ModuleConstructor({ registry, args, cache });
    const result = constructor.get("key");

    equal(undefined, result);
  });

  test("exists in registry", () => {
    const constructor = new ModuleConstructor({ registry, args, cache });
    const result = constructor.get("key");

    isTrue(result instanceof Test);
  });

  test("write to cache", () => {
    const resultCache = {};
    const cache = { add: (key, val) => (resultCache[key] = val) };

    const constructor = new ModuleConstructor({ registry, args, cache });
    const result = constructor.get("key");

    equal(resultCache["key"], result);
  });

  test("resolve arguments", () => {
    const expectedArgs = {};
    const args = { get: () => expectedArgs };

    const constructor = new ModuleConstructor({ registry, args, cache });
    const result = constructor.get("key");

    equal(expectedArgs, result.args);
  });
});
