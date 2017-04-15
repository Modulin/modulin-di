import {register} from "Injector";
import C from "example/C";

class B {
  constructor({[C]: c}) {
    this.c = c;
  }
}

export default register(B);
