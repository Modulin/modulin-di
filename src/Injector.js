import Injector from "di/Injector";
import ConfigurableInjector from "di/ConfigurableInjector";
import Registry from "di/Registry";
import ProxyArguments from "di/ProxyArguments";
import ModuleCache from "di/ModuleCache";
import ModuleConstructor from "di/ModuleConstructor";
import CompositeContext from "di/CompositeContext";

const args = new ProxyArguments();
const registry = new Registry();
const cache = new ModuleCache();
const construct = new ModuleConstructor({registry, args, cache});
const defaultContext = new CompositeContext([cache, construct]);
const injector = new Injector({registry, cache, construct, defaultContext});
export const configurableInjector = new ConfigurableInjector({injector});

export function register(...args) {
  return configurableInjector.register(...args);
}

export function load(...args) {
  return configurableInjector.load(...args);
}
