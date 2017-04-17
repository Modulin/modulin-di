export default class Context {
  constructor(values) {
    this.values = values;
  }

  has(key) {
    return !!this.values[key];
  }
  
  get(key) {
    return this.values[key];
  }
}