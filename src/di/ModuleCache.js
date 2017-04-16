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

  get(key, availableContexts) {
    const instances = this.values;
    const instancesByContext = instances[key];
    if(instancesByContext) {
      const checkValidScope = ({__creationScope: scope}) => this.canUseScope(scope, availableContexts);
      const instance = instancesByContext.find(checkValidScope);
      if(instance) {
        debug(`Loaded cached instance of`, key.toString());
        return instance;
      }
    }
  }

  canUseScope(scope, availableContexts) {
    const instanceContexts = this.getScopeContexts(scope);
    const hasSameContexts = instanceContexts.every(context => availableContexts.indexOf(context) !== -1);
    return hasSameContexts;
  }

  getScopeContexts(scope, context=scope.usedContexts) {
    return [].concat(context, ...scope.childScopes.map(scope=>this.getScopeContexts(scope)));
  }
}