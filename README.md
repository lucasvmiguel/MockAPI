# MockAPI

This is a project that run a http server, which can serve up mock service responses.

## Install

git clone https://github.com/lucasvmiguel/MockAPI.git

## Run

node main.js

## Configuration

config.json:

  {
    "port": 8082, //the server run on this port
    "scenarioPath": "/home/lucas/Projects/MockAPI/scenarios.json", //mock scenario
    "mode": "run" // "run" <- normal mode | "debug" <- debug mode
  }

scenarios.json: here you can simulate scenarios

## License

[MIT License](LICENSE)
