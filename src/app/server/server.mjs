import WebSocketServer from 'ws';
import express from 'express';
import http from 'http';

const EXPRESS_PORT = 8081;
const WEB_SOCKET_PORT = 8081;

var app = express();

var counter = 0;

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

// webSocketHttpServer.listen(WEB_SOCKET_PORT, () => {
//    console.log(`Websocket server started on port ${WEB_SOCKET_PORT}`)
// });

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

app.get('/', function (req, res) {
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

var httpServer = webSocketHttpServer.listen(EXPRESS_PORT, function () {
   var host = httpServer.address().address
   var port = httpServer.address().port
   
   console.log("Counter app listening at http://%s:%s", host, port)
})