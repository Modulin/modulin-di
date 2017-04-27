import { suite, test, equal, notEqual } from "assert";
import Registry from "di/Registry";

suite("Registry", () => {
  test("register module", () => {
    const registry = new Registry();
    class TestClass {}
    const key = registry.register(TestClass);

    const result = registry.get(key);
    equal(TestClass, result);
  });

  test("register module custom key", () => {
    const registry = new Registry();
    class TestClass {}
    const key = "key";
    const resultKey = registry.register(TestClass, key);
    const result = registry.get(key);
    equal(key, resultKey);
    equal(TestClass, result);
  });

  test("register module triggered event", () => {
    const registry = new Registry();
    class TestClass {}

    let calledCount = 0;
    registry.registered.on(() => calledCount++);
    registry.register(TestClass);
    registry.register(TestClass);

    equal(2, calledCount);
  });

  test("register module missing key", () => {
    const registry = new Registry();
    class TestClass {}
    registry.register(TestClass);

    const result = registry.get();
    equal(undefined, result);
  });

  test("register multiple module", () => {
    const registry = new Registry();

    class TestClass1 {}
    const key1 = registry.register(TestClass1);
    const result1 = registry.get(key1);

    class TestClass2 {}
    const key2 = registry.register(TestClass2);
    const result2 = registry.get(key2);

    notEqual(key1, key2);
    equal(TestClass1, result1);
    equal(TestClass2, result2);
  });
});
