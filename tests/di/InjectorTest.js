import {isTrue, suite, test, equal, arrayEqual} from "assert";

import Context from "di/Context";
import Registry from "di/Registry";
import Injector from "di/Injector";

class MockCache {

  constructor(value){
    this.value = value;
    this.gets = [];
  }

  get(key, contexts) {
    this.gets.push({key, contexts});
    return this.value;
  }
}

class MockConstructor {

  constructor(value){
    this.value = value;
    this.gets = [];
  }

  get(key, contexts) {
    this.gets.push({key, contexts});
    return this.value;
  }
}

suite('Injector' ,()=> {
  test('register', () => {
    const registry = new Registry();
    const injector = new Injector({registry});

    injector.register('value', 'key');
    const value = registry.get('key');
    
    equal('value', value);
  });

  test('getAvailableContexts', () => {
    const defaultContext = new Context('default');
    const injector = new Injector({defaultContext});

    const list = injector.getAvailableContexts(['two', 'one']);
    const values = list.contexts.map(it=>it.values);

    arrayEqual(['one', 'two', 'default'], values);
  });

  test('load hit cache', () => {
    const cache = new MockCache(true);
    const injector = new Injector({cache});
    
    injector.load('key');

    const {key} = cache.gets[0];
    equal('key', key);
  });

  test('load hit cache with contexts', () => {
    const defaultContext = new Context('default');
    const cache = new MockCache(true);
    const injector = new Injector({cache, defaultContext});

    const result = injector.load('key', 'two', 'one');

    const {key, contexts:list} = cache.gets[0];
    const values = list.contexts.map(it=>it.values);

    isTrue(result);
    arrayEqual(['one', 'two', 'default'], values);
  });

  test('load miss cache with contexts', () => {
    const defaultContext = new Context('default');
    const cache = new MockCache(false);
    const construct = new MockConstructor(true);
    const injector = new Injector({cache, construct, defaultContext});

    const result = injector.load('key', 'two', 'one');

    const {key, contexts:list} = cache.gets[0];
    const values = list.contexts.map(it=>it.values);

    isTrue(result);
    arrayEqual(['one', 'two', 'default'], values);
  });
});


