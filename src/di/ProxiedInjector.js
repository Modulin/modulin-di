import Registry from "./Registry";
import ModuleCollection from "./ModuleCollection";
import ProxyArguments from "./ProxyArguments";
import Context from "./Context";

const registry = new Registry();
const args = new ProxyArguments();
const modules = new ModuleCollection(registry, args);
const defaultContext = {get: getInstance};

function getInstance(key, contexts) {
  return modules.getInstance(key, contexts);
}

export function register(module, key) {
  return registry.register(module, key);
}

export function load(key, customContext) {
  const contexts = [defaultContext];
  if(customContext) {
    if(!customContext.get) {
      customContext = new Context(customContext);
    }
    contexts.push(customContext);
  }

  const instance = getInstance(key, contexts);
  return instance;
}
