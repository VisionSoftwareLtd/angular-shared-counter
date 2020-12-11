import WebSocketServer from 'ws';
import express from 'express';
import http from 'http';
import path from 'path';

var counter = 0;

const app = express();
// if (__dirname === undefined) {
var __dirname = path.resolve(path.dirname(''));
// }

// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/angular-shared-counter'));

// app.get('/*', function(req,res) {
//   res.sendFile(path.join(__dirname+'/dist/angular-shared-counter/index.html'));
// });

/**
 * Web Socket
 */

var connections = [];

const webSocketHttpServer = http.createServer(app);
const webSocketServer = new WebSocketServer.Server({ server: webSocketHttpServer });
webSocketServer.on('connection', (webSocketClient, req) => {
   console.log(`Connection request from: ${req.connection.remoteAddress}`);
   webSocketClient.send(`{"counter" : ${counter}}`);
   connections.push(webSocketClient);
   webSocketClient.on('message', (data) => {
      console.log(`Message from client: ${data}`);
   });
   webSocketClient.on('close', () => {
      console.log(`Stopping client connection.`);
      connections.splice(connections.indexOf(webSocketClient), 1);
   });
});


/**
 * Express
 */
const httpHeaders = {
  'Content-Type' : 'text/plain',
  'Access-Control-Allow-Origin' : '*'
};

function commonResponse(res) {
  res.set(httpHeaders);
  res.send(`${counter}`);
}

app.get('/get', function (req, res) {
  commonResponse(res);
})

app.get('/increment', function (req, res) {
  counter += 1;
  for (const connection of connections) {
     connection.send(`{"counter" : ${counter}}`);
  }
  commonResponse(res);
})

app.get('/decrement', function (req, res) {
  counter -= 1;
  for (const connection of connections) {
     connection.send(`{"counter" : ${counter}}`);
  }
  commonResponse(res);
})

// Start the app by listening on the default Heroku port
var httpServer = webSocketHttpServer.listen(process.env.PORT || 8080, function () {
  var host = httpServer.address().address
  var port = httpServer.address().port
  
  console.log("Counter app listening at http://%s:%s", host, port)
})

// Start the app by listening on the default Heroku port
// app.listen(process.env.PORT || 8080);