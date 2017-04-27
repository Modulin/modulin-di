import { suite, test, equal, isUndefined, isFalse, isTrue } from "assert";

import Context from "di/Context";

suite("Context", () => {
  test("No values", () => {
    const composite = new Context();

    const has = composite.has("first");
    const value = composite.get("first");

    isFalse(has);
    isUndefined(value);
  });

  test("Test missing value", () => {
    const composite = new Context({ first: "first value" });

    const has = composite.has("missing");
    const value = composite.get("missing");

    isFalse(has);
    isUndefined(value);
  });

  test("Test multiple values", () => {
    const composite = new Context({
      first: "first value",
      second: "second value"
    });

    const hasFirst = composite.has("first");
    const firstValue = composite.get("first");
    isTrue(hasFirst);
    equal("first value", firstValue);

    const hasSecond = composite.has("second");
    const secondValue = composite.get("second");
    isTrue(hasSecond);
    equal("second value", secondValue);
  });
});
