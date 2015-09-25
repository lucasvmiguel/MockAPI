'use strict';

class Validator{
  static Header(expected, sent){
    for(let e in expected){
      if(sent[e] !== undefined && sent[e] === expected[e])
        continue;
      else
        return false;
    }
    return true;
  }

  static Body(expected, sent){
    if(sent === undefined && expected !== undefined){
      return false;
    }

    for(let e in expected){
      if(sent[e] !== undefined && sent[e] === expected[e])
        continue;
      else
        return false;
    }
    return true;
  }

  static Params(expected, sent){
    
  }
}

module.exports = Validator;
