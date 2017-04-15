import EventSource from "./EventSource";

export default class Registry {
  constructor() {
    this.registered = new EventSource();
    this.modules = {};
  }

  register(Module, key=Symbol(Module.name)){
    this.modules[key] = Module;
    this.registered.dispatch(key);
    return key;
  }

  get(key) {
    return this.modules[key];
  }
}