'use strict';

let R = require('ramda');

class Validator{
  static Header(expected, sent) {
    for (let e in expected) {
      if (sent[e] !== undefined && sent[e] === expected[e])
        continue;
      else
        return false;
    }
    
    return true;
  }

  static Body(expected, sent) {
    return R.equals(expected, sent);
  }

  static Params(expected, sent) {
    return R.equals(expected, sent);
  }
}

module.exports = Validator;
