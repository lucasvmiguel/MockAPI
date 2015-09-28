'use strict';

let fs = require('fs');
let path = require('path');
let MockApi = require('./api/mockapi');
let Log = require('./utils/log');
let Config = require('./utils/config');

let c = Config.Instance();

let mock = new MockApi(c.port, c.scenarioPath);
Log.Info('Scenario path: ' + c.scenarioPath);
mock.run();
