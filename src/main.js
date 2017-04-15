import {load} from "Injector";
import A from "example/A";
import D from "example/D";

const d = load(D, {name:'injected instance'});
const a = load(A, {[D]: d});
const a2 = load(A, {[D]: 'test'});
console.log(a, a2);