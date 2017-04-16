import Registry from "./Registry";
import ModuleConstructor from "./ModuleConstructor";
import ProxyArguments from "./ProxyArguments";
import Context from "./Context";
import ModuleCache from "./ModuleCache";

const registry = new Registry();
const args = new ProxyArguments();
const cache = new ModuleCache();
const construct = new ModuleConstructor({registry, args, cache});

function getLoadContext(contexts) {
  const defaultContexts = [construct, cache];
  const customContexts = contexts.map(context=> {
    if(!context.get) {
      context = new Context(context);
    }
    return context;
  });

  const loadContexts = [].concat(defaultContexts, customContexts);
  return loadContexts;
}

export function register(module, key) {
  return registry.register(module, key);
}

export function load(key, ...contexts) {
  const loadContexts = getLoadContext(contexts);
  return cache.get(key, loadContexts) || construct.get(key, loadContexts);
}
