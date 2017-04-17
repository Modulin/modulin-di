export default class ProxyArguments {
  constructor() { }

  get(scope) {
    return new Proxy({}, {
      get: (_, key)=> this.getInstance(key, scope)
    });
  }

  getInstance(key, scope) {
    const {context, instance} = scope.availableContexts.getModule(key);
    if(!instance) {
      throw new Error(`Not found`);
    }

    const childScope = instance.__creationScope;
    if(childScope) {
      const isSameContext = childScope.availableContexts === scope.availableContexts;
      if(isSameContext) {
        scope.usedContexts.push(...childScope.usedContexts);
      }
    }
    scope.usedContexts.push({context, key});
    return instance
  }
}
