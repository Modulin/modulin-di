import { register } from "Injector";
import D from "./D";
import E from "./E";

class C {
  constructor({ [D]: d, [E]: e }) {
    this.d = d;
    this.e = e;
  }
}

export default register(C);
