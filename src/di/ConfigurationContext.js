export default class Context {
  constructor(values = {}) {
    this.values = values;
    this.isContext = true;
  }

  has(key) {
    return !!this.values[key];
  }

  get(key) {
    return this.values[key];
  }
}
