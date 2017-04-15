export default class ProxyArguments {
  constructor(getInstance, argumentFlags) {
    this.defaultContext = getInstance;
    this.contexts = [];
    this.argumentFlags = argumentFlags;
    this.addContext(this.defaultContext);
  }

  get() {
    return new Proxy({}, {
      get: (_, key)=> this.getInstance(key)
    });
  }

  getInstance(key) {
    for(let i = this.contexts.length - 1; i >= 0; i--) {
      const context = this.contexts[i];
      const instance = context(key);
      if(instance) {
        if(context !== this.defaultContext) {
          this.argumentFlags.usingCustomArguents = true;
        }
        return instance
      }
    }
    
    throw new Error(`Not found`);
  }

  addContext(context) {
    this.contexts.push(context);
  }

  removeContext(context) {
    const index = this.contexts.indexOf(context);
    if(index !== -1) {
      this.contexts.splice(index);
    }
  }
}