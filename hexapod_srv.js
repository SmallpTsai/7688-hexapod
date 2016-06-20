
var hexapod = require('./hexapod_core.js')

hexapod.init()


var command
var timeout_id

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 8001});
var control_ws = null;

wss.on('error', function(err) {
  console.log("Error: %s", err);
});

wss.on('connection', function connection(ws) {

  if(control_ws) 
  {
    // read only mode
    ws.on('close', function (code, message) {    
      console.log("[WSS] Viewer is gone: %s, %s", code, message);
    });   
    ws.send('reject');
    console.log("[WSS] Viewer joined: %s", ws);
  }
  else {
    control_ws = ws;

    ws.on('close', function (code, message) {
      control_ws = null;
      console.log("[WSS] Controller is gone: %s, %s", code, message);
    });

    ws.on('message', function incoming(message) {
      console.log('Command received: %s', message);

      if(command != message) {
        command = message
        hexapod.command(command)
      }

      // reset timer whenver new command receive
      clearTimeout(timeout_id)
      timeout_id = setTimeout(function() {
        command = hexapod.mode.modeStop
        console.log("Timeout! stop")
        hexapod.command(command)
      }, 5000)
    });

    ws.send('control mode');
    console.log("Controller joined: %s", ws);
  }
});

console.log("Server started...")
