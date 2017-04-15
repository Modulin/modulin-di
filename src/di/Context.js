export default class Context {
  constructor(values) {
    this.values = values;
  }
  
  get(key) {
    return this.values[key];
  }
}