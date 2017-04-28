import { suite, test, equal, notEqual } from "./assert";
import { load } from "Injector";
import Context from "di/Context";

import A from "../demo/example/A";
import D from "../demo/example/D";
import E from "../demo/example/E";

suite("Injector integration", () => {
  test("base context", () => {
    const a1 = load(E);
    const a2 = load(E);
    equal(a1, a2);
  });

  test("same context", () => {
    const d = load(D, { name: "test" });
    const context = new Context({ [D]: d });
    const a1 = load(A, context);
    const a2 = load(A, context);
    equal(a1, a2);
  });

  test("unused context context", () => {
    const a1 = load(E, { [A]: "test" });
    const a2 = load(E, { [A]: "test" });
    equal(a1, a2);
  });

  test("different context", () => {
    const d = load(D, { name: "test" });
    const a1 = load(A, { [D]: d });
    const a2 = load(A, { [D]: d });
    notEqual(a1, a2);
    equal(a1.d, a2.d);
    equal(a1.b.c.d, a2.b.c.d);
  });

  test("different context", () => {
    const d1 = load(D, { name: "test" });
    const d2 = load(D, { name: "test 2" });

    const a1 = load(A, { [D]: d1 });
    const a2 = load(A, { [D]: d2 });

    notEqual(a1, a2);
    notEqual(a1.d, a2.d);
    notEqual(a1.b.c.d, a2.b.c.d);
  });
});
