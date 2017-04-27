import { load } from "Injector";
import { preferences, LOGLEVEL } from "di/Log";
import A from "example/A";
import D from "example/D";
import Context from "di/Context";

preferences.logLevel = LOGLEVEL.debug;

const d = load(D, { name: "injected instance" });
const context = new Context({ [D]: d });

const a1 = load(A, context);
const a2 = load(A, context);
const a3 = load(A, { [D]: "test" });

console.log(a1, a2, a3);
