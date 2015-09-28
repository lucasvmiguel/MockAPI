'use strict';

let express = require('express');
let fs = require('fs');
let bodyParser = require('body-parser');

let Validator = require('../api/validator');
let Log = require('../utils/log');
let Config = require('../utils/config');

let c = Config.Instance();

class MockApi {
  constructor(port, dirname) {
    this.port = port;
    this.dirname = dirname;
    this.api = express();
    this.api.use(bodyParser.urlencoded({ extended: false }));
    this.api.use(bodyParser.json());
  }

  createRoutes(){
    var scenarios = JSON.parse(fs.readFileSync(this.dirname, 'UTF-8'));

    for (let s of scenarios) {
      this.newRoute(s, this.api);
    }
  }

  newRoute(scenario, api){
    let sceReq = scenario.request;
    let sceRes = scenario.response;

    if(!sceReq && !sceRes){
      Log.Error('invalid scenario');
      return;
    }

    switch(scenario.request.method){
      case 'GET':
        api.get(sceReq.path, this.handlerRequest(scenario));
        Log.Info('Route: ' + sceReq.path + ' [GET]');
        break;
      case 'POST':
        api.post(sceReq.path, this.handlerRequest(scenario));
        Log.Info('Route: ' + sceReq.path + ' [GET]');
        break;
      case 'PUT':
        api.put(sceReq.path, this.handlerRequest(scenario));
        Log.Info('Route: ' + sceReq.path + ' [GET]');
        break;
      case 'DELETE':
        api.delete(sceReq.path, this.handlerRequest(scenario));
        Log.Info('Route: ' + sceReq.path + ' [GET]');
        break;
      default:
        Log.Error('invalid method http on path:' + sceReq.path);
    }
  }

  handlerRequest(scenario){
    let sceReq = scenario.request;
    let sceRes = scenario.response;

    return function(req, res){
      Log.Break();
      Log.Info('Request [' + req.method + '] ' + req.path);
      if(!Validator.Header(sceReq.headers, req.headers)){
        Log.Warning('HEADER IS NOT EQUAL!');
        if(c.mode === "debug"){
          Log.Warning('sent:     ' + JSON.stringify(req.headers));
          Log.Warning('expected: ' + JSON.stringify(sceReq.headers));
        }
        res.sendStatus(404);
      }else if(!Validator.Body(sceReq.body, req.body)){
        Log.Warning('BODY IS NOT EQUAL!');
        if(c.mode === "debug"){
          Log.Warning('sent:     ' + JSON.stringify(req.body));
          Log.Warning('expected: ' + JSON.stringify(sceReq.body));
        }
        res.sendStatus(404);
      }else if(!Validator.Params(sceReq.params, req.query)){
        Log.Warning('PARAMS ARE NOT EQUAL!');
        if(c.mode === "debug"){
          Log.Warning('sent:     ' + JSON.stringify(req.query));
          Log.Warning('expected: ' + JSON.stringify(sceReq.params));
        }
        res.sendStatus(404);
      }else{
        res.set(sceRes.headers);
        res.status(sceRes.status).send(sceRes.body);
        Log.Info('Success!');
      }
    };
  }

  run(){
    this.createRoutes();

    let port = this.port;
    this.api.listen(port, function(){
      Log.Info('running on ' + port);
    });
  }
}

module.exports = MockApi;
