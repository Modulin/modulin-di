# Modulin - Dependency Injector
A minimal pure-javascript dependency injector


This is almost possible at the moment. The configuration is currently not expressive enough.
```javascript
// Car.js

import { register } from "Injector";
import Motor from "./Motor";

class Car {
  constructor({ [Motor]: motor }) {
    this.motor = motor;
  }
}

export default register(Car);

// Motor.js

import { register } from "Injector";
class Motor {}
export default register(Car);

// V8.js

import { register } from "Injector";
class V8 {}
export default register(V8);

// InjectorConfig.js

const { DefaultContext } = modulinDi;
import Motor from "./Motor";
import V8 from "./V8";

export default {
  [DefaultContext]: {
    [Motor]: V8
  }
};
```
