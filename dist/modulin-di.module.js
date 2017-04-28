var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();









































var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

var CompositeContext = function () {
  function CompositeContext() {
    var contexts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, CompositeContext);

    this.contexts = contexts;
  }

  createClass(CompositeContext, [{
    key: "has",
    value: function has(key, contexts) {
      return this.contexts.some(function (context) {
        return context.has(key, contexts);
      });
    }
  }, {
    key: "get",
    value: function get$$1(key, contexts) {
      for (var i = 0; i < this.contexts.length; i++) {
        var context = this.contexts[i];
        var module = context.get(key, contexts);
        if (module) {
          return module;
        }
      }
    }
  }]);
  return CompositeContext;
}();

var DefaultContext = Symbol("DefaultContext");

var ConfigurableInjector = function () {
  function ConfigurableInjector(_ref) {
    var injector = _ref.injector,
        _ref$config = _ref.config,
        config = _ref$config === undefined ? null : _ref$config;
    classCallCheck(this, ConfigurableInjector);

    this.injector = injector;
    this.config = config;
  }

  createClass(ConfigurableInjector, [{
    key: "setConfig",
    value: function setConfig(config) {
      this.config = config;
    }
  }, {
    key: "register",
    value: function register(module, key) {
      return this.injector.register(module, key);
    }
  }, {
    key: "load",
    value: function load(key) {
      var _injector;

      var defaultContext = this.getDefaultContext();
      var configuredContext = this.getConfiguredContext(key);

      for (var _len = arguments.length, contexts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        contexts[_key - 1] = arguments[_key];
      }

      return (_injector = this.injector).load.apply(_injector, [key, defaultContext, configuredContext].concat(contexts));
    }
  }, {
    key: "getDefaultContext",
    value: function getDefaultContext() {
      var defaultContext = this.config[DefaultContext];
      return this.getContext(defaultContext);
    }
  }, {
    key: "getConfiguredContext",
    value: function getConfiguredContext(key) {
      var customContext = this.config[key];
      return this.getContext(customContext);
    }
  }, {
    key: "getContext",
    value: function getContext(context) {
      if (context instanceof Function) {
        return context();
      } else if (context) {
        return context;
      }
    }
  }]);
  return ConfigurableInjector;
}();

var Context = function () {
  function Context() {
    var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    classCallCheck(this, Context);

    this.values = values;
    this.isContext = true;
  }

  createClass(Context, [{
    key: "has",
    value: function has(key) {
      return !!this.values[key];
    }
  }, {
    key: "get",
    value: function get$$1(key) {
      return this.values[key];
    }
  }]);
  return Context;
}();

var ContextList = function () {
  function ContextList() {
    var contexts = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    classCallCheck(this, ContextList);

    this.contexts = contexts;
  }

  createClass(ContextList, [{
    key: "add",
    value: function add() {
      var _contexts;

      (_contexts = this.contexts).push.apply(_contexts, arguments);
    }
  }, {
    key: "getContext",
    value: function getContext(key) {
      for (var i = 0; i < this.contexts.length; i++) {
        var context = this.contexts[i];

        var hasInstance = context.has(key, this);
        if (hasInstance) {
          return context;
        }
      }
    }
  }, {
    key: "getModule",
    value: function getModule(key) {
      for (var i = 0; i < this.contexts.length; i++) {
        var context = this.contexts[i];

        var instance = context.get(key, this);
        if (instance) {
          return { instance: instance, context: context, key: key };
        }
      }
      return {};
    }
  }]);
  return ContextList;
}();

var EventSource = function () {
  function EventSource() {
    classCallCheck(this, EventSource);

    this.listeners = [];
  }

  createClass(EventSource, [{
    key: "on",
    value: function on(listener) {
      var _this = this;

      this.listeners.push(listener);
      return function () {
        return _this.off(listener);
      };
    }
  }, {
    key: "off",
    value: function off(listener) {
      var index = void 0;
      while ((index = this.listeners.indexOf(listener)) !== -1) {
        this.listeners.splice(index, 1);
      }
    }
  }, {
    key: "dispatch",
    value: function dispatch() {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      this.listeners.forEach(function (listener) {
        return listener.apply(undefined, args);
      });
    }
  }]);
  return EventSource;
}();

var Injector = function () {
  function Injector(_ref) {
    var registry = _ref.registry,
        cache = _ref.cache,
        construct = _ref.construct,
        defaultContext = _ref.defaultContext;
    classCallCheck(this, Injector);

    this.registry = registry;
    this.cache = cache;
    this.construct = construct;
    this.defaultContext = defaultContext;
  }

  createClass(Injector, [{
    key: "getAvailableContexts",
    value: function getAvailableContexts(contexts) {
      var loadContexts = new ContextList();
      var customContexts = contexts.filter(notNull).map(createContext).reverse();

      loadContexts.add.apply(loadContexts, toConsumableArray(customContexts).concat([this.defaultContext]));
      return loadContexts;
    }
  }, {
    key: "register",
    value: function register(module, key) {
      return this.registry.register(module, key);
    }
  }, {
    key: "load",
    value: function load(key) {
      for (var _len = arguments.length, contexts = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        contexts[_key - 1] = arguments[_key];
      }

      var availableContexts = this.getAvailableContexts(contexts);
      return this.cache.get(key, availableContexts) || this.construct.get(key, availableContexts);
    }
  }]);
  return Injector;
}();

function notNull(it) {
  return !!it;
}

function createContext(context) {
  if (context.isContext) {
    return context;
  } else {
    return new Context(context);
  }
}

function debug() {
  if (preferences.logLevel <= LOGLEVEL.debug) {
    var _console;

    (_console = console).log.apply(_console, arguments);
  }
}

function info() {
  if (preferences.logLevel <= LOGLEVEL.info) {
    var _console2;

    (_console2 = console).log.apply(_console2, arguments);
  }
}

function error$1() {
  if (preferences.logLevel <= LOGLEVEL.error) {
    var _console3;

    (_console3 = console).log.apply(_console3, arguments);
  }
}

var LOGLEVEL = {
  debug: 1,
  info: 2,
  error: 3
};

var preferences = {
  logLevel: LOGLEVEL.info
};

var Log = Object.freeze({
	debug: debug,
	info: info,
	error: error$1,
	LOGLEVEL: LOGLEVEL,
	preferences: preferences
});

var ModuleCache = function () {
  function ModuleCache() {
    classCallCheck(this, ModuleCache);

    this.values = {};
  }

  createClass(ModuleCache, [{
    key: "add",
    value: function add(key, instance) {
      this.values[key] = this.values[key] || [];
      if (this.values[key].indexOf(instance) === -1) {
        debug("Add to cache", key.toString());
        this.values[key].push(instance);
      }
    }
  }, {
    key: "has",
    value: function has(key, availableContexts) {
      return !!this.__get(key, availableContexts);
    }
  }, {
    key: "get",
    value: function get$$1(key, availableContexts) {
      var instance = this.__get(key, availableContexts);
      if (instance) {
        debug("Loaded cached instance of", key.toString());
        return instance;
      }
    }
  }, {
    key: "__get",
    value: function __get(key, availableContexts) {
      var _this = this;

      var instances = this.values;
      var instancesByContext = instances[key];
      if (instancesByContext) {
        return instancesByContext.find(function (_ref) {
          var usedContexts = _ref.__creationScope.usedContexts;

          return _this.canUseScope(usedContexts, availableContexts);
        });
      }
    }
  }, {
    key: "canUseScope",
    value: function canUseScope(usedContexts, availableContexts) {
      var hasSameContexts = usedContexts.every(function (_ref2) {
        var context = _ref2.context,
            key = _ref2.key;

        var derivedContext = availableContexts.getContext(key);
        return context === derivedContext;
      });
      return hasSameContexts;
    }
  }]);
  return ModuleCache;
}();

var ModuleConstructor = function () {
  function ModuleConstructor(_ref) {
    var registry = _ref.registry,
        args = _ref.args,
        cache = _ref.cache;
    classCallCheck(this, ModuleConstructor);

    this.args = args;
    this.registry = registry;
    this.cache = cache;
  }

  createClass(ModuleConstructor, [{
    key: "has",
    value: function has(key) {
      return !!this.registry.get(key);
    }
  }, {
    key: "get",
    value: function get$$1(key, availableContexts) {
      var id = {};
      var usedContexts = [];
      var scope = { id: id, availableContexts: availableContexts, usedContexts: usedContexts };

      var Module = this.registry.get(key);
      if (Module) {
        var module = new Module(this.args.get(scope));
        Object.defineProperty(module, "__creationScope", { get: function get$$1() {
            return scope;
          } });

        debug("Created new instance of", key.toString());
        this.cache.add(key, module);
        return module;
      }
    }
  }]);
  return ModuleConstructor;
}();

var ProxyArguments = function () {
  function ProxyArguments() {
    classCallCheck(this, ProxyArguments);
  }

  createClass(ProxyArguments, [{
    key: "get",
    value: function get$$1(scope) {
      var _this = this;

      return new Proxy({}, {
        get: function get$$1(_, key) {
          return _this.getInstance(key, scope);
        }
      });
    }
  }, {
    key: "getInstance",
    value: function getInstance(key, scope) {
      var _scope$availableConte = scope.availableContexts.getModule(key),
          context = _scope$availableConte.context,
          instance = _scope$availableConte.instance;

      if (!instance) {
        throw new Error("Not found");
      }

      var childScope = instance.__creationScope;
      if (childScope) {
        var isSameContext = childScope.availableContexts === scope.availableContexts;
        if (isSameContext) {
          var _scope$usedContexts;

          (_scope$usedContexts = scope.usedContexts).push.apply(_scope$usedContexts, toConsumableArray(childScope.usedContexts));
        }
      }
      scope.usedContexts.push({ context: context, key: key });
      return instance;
    }
  }]);
  return ProxyArguments;
}();

var Registry = function () {
  function Registry() {
    classCallCheck(this, Registry);

    this.registered = new EventSource();
    this.modules = {};
  }

  createClass(Registry, [{
    key: "register",
    value: function register(Module) {
      var key = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : Symbol(Module.name);

      this.modules[key] = Module;
      this.registered.dispatch(key);
      return key;
    }
  }, {
    key: "get",
    value: function get$$1(key) {
      return this.modules[key];
    }
  }]);
  return Registry;
}();

export { CompositeContext, ConfigurableInjector, Context, ContextList, DefaultContext, EventSource, Injector, Log, ModuleCache, ModuleConstructor, ProxyArguments, Registry };
