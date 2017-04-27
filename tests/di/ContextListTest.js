import { suite, test, equal, isUndefined, isTrue } from "assert";

import ContextList from "di/ContextList";
import Context from "di/Context";

suite("ContextList", () => {
  test("create with values", () => {
    const primaryContext = new Context();
    const secondaryContext = new Context();
    const list = new ContextList([primaryContext, secondaryContext]);

    isTrue(list.contexts.indexOf(primaryContext) === 0);
    isTrue(list.contexts.indexOf(secondaryContext) === 1);
  });

  test("add multiple", () => {
    const primaryContext = new Context();
    const secondaryContext = new Context();
    const list = new ContextList();

    list.add(primaryContext, secondaryContext);
    isTrue(list.contexts.indexOf(primaryContext) === 0);
    isTrue(list.contexts.indexOf(secondaryContext) === 1);
  });

  test("missing getContext", () => {
    const list = new ContextList();
    isUndefined(list.getContext("missing"));
  });

  test("successful getContext", () => {
    const primaryContext = new Context({ first: true });
    const secondaryContext = new Context({ first: true, second: true });
    const list = new ContextList([primaryContext, secondaryContext]);

    equal(primaryContext, list.getContext("first"));
    equal(secondaryContext, list.getContext("second"));
  });

  test("missing getModule", () => {
    const list = new ContextList();
    const { instance, context } = list.getModule("missing");

    isUndefined(instance);
    isUndefined(context);
  });

  test("successful getModule", () => {
    const primaryContext = new Context({ first: "first value" });
    const secondaryContext = new Context({
      first: "none",
      second: "second value"
    });
    const list = new ContextList([primaryContext, secondaryContext]);

    const { instance: firstValue } = list.getModule("first");
    const { instance: secondValue } = list.getModule("second");

    equal("first value", firstValue);
    equal("second value", secondValue);
  });
});
