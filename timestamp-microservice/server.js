var http = require('http');
var express = require('express');
var moment = require('moment');
var path = require('path');

var app = express();
var server = http.createServer(app);

app.use(express.static(path.join(__dirname, "client")));

app.get('/', (req,res)=>{
  res.send("Home");
});

app.get('/:timestamp', (req, res)=> {
  var timestamp = req.params.timestamp;
  var validatedTime;
  if(/^[0-9]*$/.test(timestamp)){
    validatedTime = moment(timestamp, "X");
    console.log("unix: " + validatedTime);
  } else {
    validatedTime = moment(timestamp).format("MMMM DD YYYY");
  }
  
  if(moment(validatedTime).isValid()){
    var natTime = moment(validatedTime).format("MMMM D, YYYY");
    var unixTime = moment(validatedTime).format("X");
    var output ={"unix":unixTime, "natural":natTime};
  } else {
    output = {"unix": null, "natural": null};
  }
  res.send(output);
  });



server.listen(process.env.PORT || 8080, function(){
  console.log("Listening at " + 8080);
});

