import {register} from "Injector";
import B from "./B";
import C from "./C";
import D from "./D";
import E from "./E";

class A {
  constructor({[D]: d, [B]: b, [C]: c, [E]: e}) {
    this.b = b;
    this.c = c;
    this.d = d;
    this.e = e;
  }
}

export default register(A);
