import {register} from "Injector";
import B from "example/B";
import C from "example/C";
import D from "example/D";

class A {
  constructor({[B]: b, [C]: c, [D]: d}) {
    this.b = b;
    this.c = c;
    this.d = d;
  }
}

export default register(A);
