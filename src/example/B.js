import { register } from "Injector";
import C from "./C";
import E from "./E";

class B {
  constructor({ [C]: c, [E]: e }) {
    this.c = c;
    this.e = e;
  }
}

export default register(B);
