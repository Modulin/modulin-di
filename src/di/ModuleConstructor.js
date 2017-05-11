import { debug } from "./Log";
import { creationScopes } from "./CreationScopeCache";

export default class ModuleConstructor {
  constructor({ registry, args, cache }) {
    this.args = args;
    this.registry = registry;
    this.cache = cache;
  }

  has(key) {
    return !!this.registry.get(key);
  }

  get(key, availableContexts) {
    const id = {};
    const usedContexts = [];
    const scope = { id, availableContexts, usedContexts };

    const Module = this.registry.get(key);
    if (Module) {
      const module = new Module(this.args.get(scope));
      creationScopes.add(module, scope);

      debug(`Created new instance of`, key.toString());
      this.cache.add(key, module);
      return module;
    }
  }
}
