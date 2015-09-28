'use strict';

let fs = require('fs');
let path = require('path');

class Config{

  constructor() {
    throw 'Cannot iniatilize this class(Singleton class)';
  }

  static Instance() {
    if (!this.instance) {
      this.instance = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../config.json'), 'UTF-8'));
    }

    return this.instance;
  }
}

module.exports = Config;
