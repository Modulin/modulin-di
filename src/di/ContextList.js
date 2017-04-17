export default class ContextList {

  constructor(contexts=[]) {
    this.contexts = contexts;
  }

  add(...contexts) {
    this.contexts.push(...contexts);
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