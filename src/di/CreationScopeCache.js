export class CreationScopeCache {

  constructor() {
    this.scopes = new WeakMap();
  }

  clear() {
    this.scopes = new WeakMap();
  }

  add(key, scope) {
    this.scopes.set(key, scope);
  }

  get(key) {
    return this.scopes.get(key);
  }

}

export const creationScopes = new CreationScopeCache();
