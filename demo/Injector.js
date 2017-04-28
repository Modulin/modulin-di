const {
  Injector,
  ConfigurableInjector,
  Registry,
  ProxyArguments,
  ModuleCache,
  ModuleConstructor,
  CompositeContext
} = modulinDi;

const args = new ProxyArguments();
const registry = new Registry();
const cache = new ModuleCache();
const construct = new ModuleConstructor({ registry, args, cache });
const defaultContext = new CompositeContext([cache, construct]);
const injector = new Injector({ registry, cache, construct, defaultContext });
export const configurableInjector = new ConfigurableInjector({ injector });

export function register(...args) {
  return configurableInjector.register(...args);
}

export function load(...args) {
  return configurableInjector.load(...args);
}
