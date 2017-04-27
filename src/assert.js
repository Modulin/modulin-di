export function equal(target, other, message) {
  if (target !== other) {
    throw new Error(message);
  }
}

export function arrayEqual(target, other, message) {
  if (target instanceof Array && other instanceof Array) {
    equal(target.length, other.length);
    for (let i = 0; i < target.length; i++) {
      if (target[i] !== other[i]) {
        throw new Error(message);
      }
    }
  } else {
    throw new Error("The provided inputs a not of type array");
  }
}

export function notEqual(target, other, message) {
  if (target === other) {
    throw new Error(message);
  }
}

export function isTrue(valid, message) {
  if (!valid) {
    throw new Error(message);
  }
}

export function isFalse(valid, message) {
  if (valid) {
    throw new Error(message);
  }
}

export function isUndefined(valid, message) {
  if (valid !== void 0) {
    throw new Error(message);
  }
}

export function isNotUndefined(valid, message) {
  if (valid === void 0) {
    throw new Error(message);
  }
}

export function isNull(valid, message) {
  if (valid !== null) {
    throw new Error(message);
  }
}

export function isNotNull(valid, message) {
  if (valid === null) {
    throw new Error(message);
  }
}

let currentSuite = newContext();

function newContext() {
  return {
    passed: [],
    failed: []
  };
}

export function test(name, closure) {
  try {
    const promise = closure();

    if (promise && promise.then) {
      promise.then(passed);
    } else {
      passed();
    }

    if (promise && promise.catch) {
      promise.catch(failed);
    }
  } catch (ex) {
    failed(ex);
  }

  function passed() {
    currentSuite.passed.push({ name, closure });
  }

  function failed(message) {
    console.error(message);
    currentSuite.failed.push({ name, closure });
  }
}

export function suite(name, closure) {
  currentSuite = newContext();

  closure();

  const failedCount = currentSuite.failed.length;
  const passedCount = currentSuite.passed.length;
  const totalCount = failedCount + passedCount;

  if (currentSuite.failed.length > 0) {
    console.log(`Failed: ${name}`, `${passedCount}/${totalCount}`);
    const failedClosures = currentSuite.failed.map(
      it => it.name + " " + it.closure.toString()
    );
    console.log(...failedClosures);
  } else {
    console.log(`Passed: ${name}`, `${passedCount}/${totalCount}`);
  }
}
