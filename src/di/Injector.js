import Context from "./Context";
import ContextList from "./ContextList";

export default class Injector {
  constructor({ registry, cache, construct, defaultContext }) {
    this.registry = registry;
    this.cache = cache;
    this.construct = construct;
    this.defaultContext = defaultContext;
  }

  getAvailableContexts(contexts) {
    const loadContexts = new ContextList();
    const customContexts = contexts
      .filter(notNull)
      .map(createContext)
      .reverse();

    loadContexts.add(...customContexts, this.defaultContext);
    return loadContexts;
  }

  register(module, key) {
    return this.registry.register(module, key);
  }

  load(key, ...contexts) {
    const availableContexts = this.getAvailableContexts(contexts);
    return (
      this.cache.get(key, availableContexts) ||
      this.construct.get(key, availableContexts)
    );
  }
}

function notNull(it) {
  return !!it;
}

function createContext(context) {
  if (context.isContext) {
    return context;
  } else {
    return new Context(context);
  }
}
