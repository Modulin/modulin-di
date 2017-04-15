export default {
  equal(target, other, message) {
    if(target !== other) {
      throw new Error(message);
    }
  },

  notEqual(target, other, message) {
    if(target === other) {
      throw new Error(message);
    }
  },

  true(valid, message) {
    if(!valid) {
      throw new Error(message);
    }
  },

  false(valid, message) {
    if(valid) {
      throw new Error(message);
    }
  },
};