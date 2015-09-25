'use strict';

let fs = require('fs');
let path = require('path');
let MockApi = require('./mockapi');
let config = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../MockAPI/config.json'), 'UTF-8'));

let mock = new MockApi(config.port, path.resolve(__dirname, config.scenarioPath));
mock.run();
