import {debug} from "./Log";

export default class ModuleCache {

  constructor() {
    this.values = {};
  }

  add(key, instance) {
    this.values[key] = this.values[key] || [];
    if(this.values[key].indexOf(instance) === -1) {
      debug(`Add to cache`, key.toString());
      this.values[key].push(instance);
    }
  }

  has(key, availableContexts) {
    return !!this.__get(key, availableContexts);
  }

  get(key, availableContexts) {
    const instance = this.__get(key, availableContexts);
    if(instance) {
      debug(`Loaded cached instance of`, key.toString());
      return instance;
    }
  }

  __get(key, availableContexts) {
    const instances = this.values;
    const instancesByContext = instances[key];
    if(instancesByContext) {
      return instancesByContext.find(({__creationScope: {usedContexts}}) => {
        return this.canUseScope(usedContexts, availableContexts);
      });
    }
  }

  canUseScope(usedContexts, availableContexts) {
    const hasSameContexts = usedContexts.every(({context, key}) => {
      const derivedContext = availableContexts.getContext(key);
      return context === derivedContext;
    });
    return hasSameContexts;
  }

}