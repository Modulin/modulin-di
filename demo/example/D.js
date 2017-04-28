import { register } from "Injector";

class D {
  constructor({ name }) {
    this.name = name;
  }
}

export default register(D);
