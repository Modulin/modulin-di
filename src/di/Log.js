export function debug(...args) {
  if (preferences.logLevel <= LOGLEVEL.debug) {
    console.log(...args);
  }
}

export function info(...args) {
  if (preferences.logLevel <= LOGLEVEL.info) {
    console.log(...args);
  }
}

export function error(...args) {
  if (preferences.logLevel <= LOGLEVEL.error) {
    console.log(...args);
  }
}

export const LOGLEVEL = {
  debug: 1,
  info: 2,
  error: 3
};

export const preferences = {
  logLevel: LOGLEVEL.info
};
