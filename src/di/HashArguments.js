export default class HashArguments {
  constructor(getInstance) {
    this.args = {};
    this.getInstance = getInstance;
  }

  register(key) {
    Object.defineProperty(this.args, key, {
      get: ()=>this.getInstance(key)
    });
  }

  get() {
    return this.args;
  }
}