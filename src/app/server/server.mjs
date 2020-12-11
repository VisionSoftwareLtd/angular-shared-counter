import express from 'express';

var app = express();

var counter = 0;
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
   commonResponse(res);
})

app.get('/decrement', function (req, res) {
   counter -= 1;
   commonResponse(res);
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Counter app listening at http://%s:%s", host, port)
})