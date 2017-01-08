process.env.DEBUG = 'actions-on-google:*';
var Assistant = require('actions-on-google').ApiAiAssistant;
var express = require('express');
var bodyParser = require('body-parser');

var kaitt = express();
kaitt.use(bodyParser.json({type: 'application/json'}));

var audio = require('Audio');
var kitt = new Audio("Knight_Right.mp3");

kaitt.post('/',function(req,res){
	const assistant = new Assistant({request: req, response: res});
	console.log('Request headers: ' + JSON.stringify(req.headers));
	console.log('Request body: ' + JSON.stringify(req.body));

	// function responseHandler (assistant) {
 //    	assistant.tell('911 alerted. All lights are green. On our way to the hospital.');
 //  	assistant.handleRequest(responseHandler);
 //  }
  function musicMap() {
  	window.open("https://goo.gl/maps/NAYL5n2TRz12");
  	kitt.play();
  }

  assistant.handleRequest(musicMap);
});

if (module === require.main) {
  // [START server]
  // Start the server
  var server = kaitt.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log('KaittApp listening on port %s', port);
  });
}
module.exports = kaitt;
