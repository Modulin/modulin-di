import { main } from "setup";

const load = modulin.createLoader("src/");
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
