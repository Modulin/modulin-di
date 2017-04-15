import Registry from "./Registry";
import ModuleCollection from "./ModuleCollection";
import ProxyArguments from "./ProxyArguments";

const argumentFlags = {};

const registry = new Registry();
const args = new ProxyArguments(getInstance, argumentFlags);
const modules = new ModuleCollection(registry, args, argumentFlags);

function getInstance(key) {
  return modules.getInstance(key);
}

export function register(module, key) {
  return registry.register(module, key);
}

export function load(key, customModules) {
  let context;
  if(customModules) {
    context = (key)=>customModules[key];
  } else {
    context = ()=>{};
  }

  args.addContext(context);
  const instance = getInstance(key);
  args.removeContext(context);

  return instance;
}