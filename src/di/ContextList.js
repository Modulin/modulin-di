export default class ContextList {

  constructor() {
    this.contexts = [];
  }

  add(...contexts) {
    this.contexts.unshift(...contexts.reverse());
  }

  getContext(key) {
    for(let i = 0; i < this.contexts.length; i++) {
      const context = this.contexts[i];

      const hasInstance = context.has(key, this);
      if(hasInstance) {
        return context;
      }
    }
  }

  getModule(key) {
    for(let i = 0; i < this.contexts.length; i++) {
      const context = this.contexts[i];

      const instance = context.get(key, this);
      if(instance) {
        return {instance, context, key};
      }
    }
    return {};
  }
}