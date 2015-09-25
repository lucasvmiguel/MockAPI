'use strict';

class Log{
  static Error(text){
    console.log('Error: ' + text);
  }
  static Info(text){
    console.log('Info: ' + text);
  }
  static Warning(text){
    console.log('Warning: ' + text);
  }
}

module.exports = Log;
