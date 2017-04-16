import {suite, test, equal, arrayEqual} from "assert";
import EventSource from "di/EventSource";

suite('EventSource' ,()=> {
  test('one event listener', () => {
    const source = new EventSource();
    let calledCount = 0;
    const callable = ()=>calledCount++;

    source.on(callable);
    source.dispatch();

    equal(1, calledCount);
  });

  test('same event listener twice', () => {
    const source = new EventSource();
    let calledCount = 0;
    const callable = ()=>calledCount++;

    source.on(callable);
    source.on(callable);
    source.dispatch();

    equal(2, calledCount);
  });

  test('multiple event listeners', () => {
    const source = new EventSource();
    let calledCount = 0;
    const callable1 = ()=>calledCount+=1;
    const callable2 = ()=>calledCount+=10;

    source.on(callable1);
    source.on(callable2);
    source.dispatch();

    equal(11, calledCount);
  });

  test('unlisten', () => {
    const source = new EventSource();
    let calledCount = 0;
    const callable = ()=>calledCount++;

    source.on(callable);
    source.dispatch();
    source.off(callable) ;
    source.dispatch();

    equal(1, calledCount);
  });

  test('unlisten all', () => {
    const source = new EventSource();
    let calledCount = 0;
    const callable = ()=>calledCount++;

    source.on(callable);
    source.on(callable);
    source.dispatch();
    source.off(callable) ;
    source.dispatch();

    equal(2, calledCount);
  });

  test('unlisten from unlistener', () => {
    const source = new EventSource();
    let calledCount = 0;
    const callable = ()=>calledCount++;

    const off = source.on(callable);
    source.dispatch();
    off();
    source.dispatch();

    equal(1, calledCount);
  });

  test('dispatch', () => {
    const testValues = [1,2,3,4,5];
    const source = new EventSource();
    const callable = (...args)=>result = args;
    let result;

    source.on(callable);
    source.dispatch(...testValues);

    arrayEqual(testValues, result);
  });
});
