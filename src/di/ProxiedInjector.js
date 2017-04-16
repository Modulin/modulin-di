import Registry from "./Registry";
import ModuleConstructor from "./ModuleConstructor";
import ProxyArguments from "./ProxyArguments";
import Context from "./Context";
import ModuleCache from "./ModuleCache";

const registry = new Registry();
const args = new ProxyArguments();
const cache = new ModuleCache();
const construct = new ModuleConstructor({registry, args, cache});

export function register(module, key) {
  return registry.register(module, key);
}

export function load(key, ...customContexts) {
  const contexts = [construct, cache];
  customContexts.forEach(context=> {
    if(!context.get) {
      context = new Context(context);
    }
    contexts.push(context);
  });

  return cache.get(key, contexts) || construct.get(key, contexts);
}
