import DefaultContext from "./DefaultContext";

export default class ConfigurableInjector {

  constructor({injector, config=null}) {
    this.injector = injector;
    this.config = config;
  }
  
  setConfig(config){
    this.config = config;
  }

  register(module, key){
    return this.injector.register(module, key);
  }

  load(key, ...contexts) {
    const defaultContext = this.getDefaultContext();
    const configuredContext = this.getConfiguredContext(key);
    return this.injector.load(key,
      defaultContext,
      configuredContext,
      ...contexts
    );
  }

  getDefaultContext() {
    const defaultContext = this.config[DefaultContext];
    return this.getContext(defaultContext);
  }

  getConfiguredContext(key) {
    const customContext = this.config[key];
    return this.getContext(customContext);
  }

  getContext(context) {
    if (context instanceof Function) {
      return context();
    } else if (context) {
      return context;
    }
  }
}
