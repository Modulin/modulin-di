import {debug} from "./Log";

export default class ModuleCache {

  constructor() {
    this.instances = {};
  }

  add(key, instance) {
    this.instances[key] = this.instances[key] || [];
    if(this.instances[key].indexOf(instance) === -1) {
      debug(`Add to cache`, key.toString());
      this.instances[key].push(instance);
    }
  }

  get(key, contexts) {
    const scope = {childScopes: [], availableContexts:contexts, usedContexts: []};

    const instances = this.instances;
    const instancesByContext = instances[key];
    if(instancesByContext) {
      const instance = instancesByContext.find(instance => this.canUseScope(instance.__creationScope, scope));
      if(instance) {
        debug(`Loaded cached instance of`, key.toString());
        return instance;
      }
    }
  }

  canUseScope(instance, reference) {
    const instanceContexts = this.getChildContexts(instance);
    const referenceContexts = this.getChildContexts(reference, reference.availableContexts);
    const hasSameContexts = instanceContexts.every(context => referenceContexts.indexOf(context) !== -1);
    return hasSameContexts;
  }

  getChildContexts(scope, context=scope.usedContexts) {
    const contexts = [].concat(context, ...scope.childScopes.map(scope=>this.getChildContexts(scope)));
    contexts.forEach(context=> {
      const instancesBag = context.values;
      if (instancesBag) {
        const instanceKeys = Reflect.ownKeys(instancesBag);
        instanceKeys
          .map(key=>instancesBag[key])
          .filter(instance=>instance.__creationScope)
          .forEach(instance => {
            instance.__creationScope.usedContexts.forEach(context => {
                if (contexts.indexOf(context) === -1) {
                  contexts.push(context);
                }
              }
            );
          })
      }
    });
    return contexts;
  }
}