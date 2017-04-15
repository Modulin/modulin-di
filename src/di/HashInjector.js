import Registry from "./Registry";
import ModuleCollection from "./ModuleCollection";
import HashArguments from "./HashArguments";

const registry = new Registry();
registry.registered.on(registered);
function registered(key) {
  args.register(key);
}

const args = new HashArguments(getInstance);
const modules = new ModuleCollection(registry, args);

function getInstance(key) {
  return modules.getInstance(key);
}

export function register(module, key) {
  return registry.register(module, key);
}

export function load(key) {
  return modules.getInstance(key);
}