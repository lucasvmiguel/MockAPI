'use strict';

let express = require('express');
let R = require('ramda');
let fs = require('fs');
let Validator = require('./validator');
let Log = require('./log');
let bodyParser = require('body-parser');

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
      console.log('invalid scenario!');
      return;
    }

    switch(scenario.request.method){
      case 'GET':
        api.get(sceReq.path, this.handlerRequest(scenario));
        console.log(sceReq.path + ' [GET]');
        break;
      case 'POST':
        api.post(sceReq.path, this.handlerRequest(scenario));
        console.log(sceReq.path + ' [POST]');
        break;
      case 'PUT':
        api.put(sceReq.path, this.handlerRequest(scenario));
        console.log(sceReq.path + ' [PUT]');
        break;
      case 'DELETE':
        api.delete(sceReq.path, this.handlerRequest(scenario));
        console.log(sceReq.path + ' [DELETE]');
        break;
      default:
        console.log('invalid method http on path:' + sceReq.path);
    }
  }

  handlerRequest(scenario){
    let sceReq = scenario.request;
    let sceRes = scenario.response;

    return function(req, res){
      if(!Validator.Header(sceReq.headers, req.headers)){
        Log.Error('header is not equal!');
        res.sendStatus(404);
      }
      else if(!Validator.Body(sceReq.body, req.body)){
        Log.Error('body is not equal!');
        res.sendStatus(404);
      }else{
        res.set(sceRes.headers);
        res.sendStatus(sceRes.status);
        res.send(sceRes.body);
      }
    };
  }

  run(){
    this.createRoutes();

    this.api.listen(this.port, function(){
      console.log('running on ' + this.port);
    });
  }
}

module.exports = MockApi;
