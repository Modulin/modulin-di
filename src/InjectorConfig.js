import D from "./example/D";
import C from "./example/C";
import DefaultContext from "./di/DefaultContext";

export default {
  [DefaultContext]: {},
  [D]: {name: 'configured name'},
  [C]() {
    return {};
  }
}

export default {}