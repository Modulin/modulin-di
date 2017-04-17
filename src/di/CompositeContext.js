export default class CompositeContext {
  constructor(contexts) {
    this.contexts = contexts;
  }

  has(key, contexts) {
    return this.contexts.some(context=>context.has(key, contexts));
  }

  get(key, contexts) {
    for(let i = 0; i < this.contexts.length; i++) {
      const context = this.contexts[i];
      const module = context.get(key, contexts);
      if(module) {
        return module;
      }
    }
  }
}