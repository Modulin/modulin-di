import { main, root } from "setup";

const load = modulinFetch.createLoader(root);
load(
  ["Injector", "InjectorConfig"],
  (
    { exports: { configurableInjector } },
    { exports: { default: injectorConfig } }
  ) => {
    configurableInjector.setConfig(injectorConfig);
    load(main);
  }
);
