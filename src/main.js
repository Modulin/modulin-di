import {load} from "Injector";
import A from "example/A";
import D from "example/D";
import assert from "./assert";
import Context from "./di/Context";

const d = load(D, {name:'injected instance'});
const context = new Context({[D]: d});

const a1 = load(A, context);
const a2 = load(A, context);
const a3 = load(A, {[D]: 'test'});

assert.equal(a1.d, a2.d);
assert.equal(a1.b, a2.b);
assert.equal(a1.c, a2.c);
assert.equal(a1.b.c.d, a2.b.c.d);

assert.notEqual(a1.d, a3.d);
assert.notEqual(a1.b, a3.b);
assert.notEqual(a1.c, a3.c);
assert.notEqual(a1.b.c.d, a3.b.c.d);
