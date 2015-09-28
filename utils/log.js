'use strict';

let colors = require('colors/safe');

class Log{
  static Break() {
    console.log('\n');
  }

  static Error(text) {
    console.log(colors.red('Error: ' + text));
  }

  static Info(text) {
    console.log(colors.green('Info: ' + text));
  }

  static Warning(text) {
    console.log(colors.yellow('Warning: ' + text));
  }
}

module.exports = Log;
