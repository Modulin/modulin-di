const {
  Log: { preferences, LOGLEVEL },
} = modulinDi;
preferences.logLevel = LOGLEVEL.debug;

const load = modulinFetch.createLoader("demo/");
load(["Injector", "InjectorConfig"], (
  { exports: { configurableInjector } },
  { exports: { default: injectorConfig } }
) => {
  configurableInjector.setConfig(injectorConfig);
  load(['main']);
});
