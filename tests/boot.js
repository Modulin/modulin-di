import { main, root } from "setup";

const load = modulinFetch.createLoader(root);
load(["Injector", "InjectorConfig"], function(...args) {
  boot(...args);
  loadTests();
});

function boot(
  { exports: { configurableInjector } },
  { exports: { default: injectorConfig } }
) {
  configurableInjector.setConfig(injectorConfig);
}

function loadTests() {
  load(main);
}
