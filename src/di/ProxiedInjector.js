import Registry from "./Registry";
import ProxyArguments from "./ProxyArguments";
import ModuleCache from "./ModuleCache";
import ModuleConstructor from "./ModuleConstructor";

import CompositeContext from "./CompositeContext";
import Context from "./Context";
import ContextList from "./ContextList";

const registry = new Registry();
const args = new ProxyArguments();
const cache = new ModuleCache();
const construct = new ModuleConstructor({registry, args, cache});
const defaultContext = new CompositeContext([cache, construct]);

function getAvailableContexts(contexts) {
  const loadContexts = new ContextList();
  const customContexts = contexts.map(context=> {
    if(!context.get) {
      context = new Context(context);
    }
    return context;
  });

  loadContexts.add(defaultContext);
  loadContexts.add(...customContexts);
  return loadContexts;
}

export function register(module, key) {
  return registry.register(module, key);
}

export function load(key, ...contexts) {
  const availableContexts = getAvailableContexts(contexts);
  return cache.get(key, availableContexts) || construct.get(key, availableContexts);
}
