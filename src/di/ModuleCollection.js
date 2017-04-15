export default class ModuleCollection {

  constructor(registry, args, argumentFlags) {
    this.instances = {};
    this.args = args;
    this.registry = registry;
    this.argumentFlags = argumentFlags;
  }

  getCachedInstance(key, instances) {
    const instance = instances[key];
    if(instance) {
      console.log(`Loaded cached instance of`, key.toString());
      return instance;
    }
  }

  getNewInstance(key) {
    const Module = this.registry.get(key);
    if(Module) {
      console.log(`Created new instance of`,  key.toString());
      return new Module(this.args.get());
    }
  }

  getInstance(key) {
    const instance
         = this.getCachedInstance(key, this.instances)
        || this.getNewInstance(key);

    const useCache = !this.argumentFlags.usingCustomArguents;
    this.argumentFlags.usingCustomArguents = false;
    
    if(useCache && instance) {
      this.instances[key] = instance;
    }

    return instance;
  }
}
