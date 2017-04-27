import { suite, test, equal, isUndefined, isFalse, isTrue } from "assert";

import CompositeContext from "di/CompositeContext";
import Context from "di/Context";

suite("CompositeContext", () => {
  test("no contexts", () => {
    const composite = new CompositeContext();

    const hasFirst = composite.has("first");
    const firstValue = composite.get("first");

    isFalse(hasFirst);
    isUndefined(firstValue);
  });

  test("single context", () => {
    const context = new Context({ first: "first expected" });
    const composite = new CompositeContext([context]);

    const hasFirst = composite.has("first");
    const firstValue = composite.get("first");

    isTrue(hasFirst);
    equal("first expected", firstValue);
  });

  test("multiple contexts", () => {
    const primaryContext = new Context({ first: "first expected" });
    const secondaryContext = new Context({
      first: "nothing",
      second: "second expected"
    });
    const composite = new CompositeContext([primaryContext, secondaryContext]);

    const hasFirst = composite.has("first");
    const firstValue = composite.get("first");
    isTrue(hasFirst);
    equal("first expected", firstValue);

    const hasSecond = composite.has("second");
    const secondValue = composite.get("second");
    isTrue(hasSecond);
    equal("second expected", secondValue);
  });
});
