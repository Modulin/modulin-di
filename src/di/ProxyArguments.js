export default class ProxyArguments {
  constructor() { }

  get(scope) {
    return new Proxy({}, {
      get: (_, key)=> this.getInstance(key, scope)
    });
  }

  getInstance(key, scope) {
    for(let i = scope.availableContexts.length - 1; i >= 0; i--) {
      const context = scope.availableContexts[i];
      const instance = context.get(key, scope.availableContexts);
      if(instance) {
        const childScope = instance.__creationScope;
        if(childScope) {
          scope.childScopes.push(childScope);
        }
        if(scope.usedContexts.indexOf(context) === -1) {
          scope.usedContexts.push(context);
        }
        return instance
      }
    }
    
    throw new Error(`Not found`);
  }

}