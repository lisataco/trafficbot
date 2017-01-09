'use strict';

//process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

// app.set()

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

// myEmitter.on('event', () => {
//   console.log('should trigger redirectToMap()');
//   redirectToMap('', 'https://goo.gl/maps/NAYL5n2TRz12');
// });

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

// [START YourAction]

app.get('/home',(req,res) =>{
	// res.status(200).send('Welcome! This is your Autonomous Vehicle - K.AI.T.T.');
	res.render('pages/index');
});

app.get('/map',(req,res) =>{
	// res.status(200).send('Welcome! This is your Autonomous Vehicle - K.AI.T.T.');
	res.redirect(301,'https://goo.gl/maps/NAYL5n2TRz12');
});

// window.open();
// function redirectToMap(res, url) {
// 	res.redirect(301, url);
// }

function respondSuccessfully(res) {
    let webhookResponse = {
        speech: "911 approved. The path is cleared for you. We're on our way to the hospital.",
        displayText: "911 approved. The path is cleared for you. We're on our way to the hospital.",
        data: {},
        contextOut: [],
        source: 'kaitt'
    };

    res.set('Content-Type', 'application/json');
    res.send(webhookResponse);
}

app.post('/webhook', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  //Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    assistant.tell('911 has been alerted. The path is cleared and we are on our way to the hospital');

    myEmitter.emit('redirect-prompt');
  }

  assistant.handleRequest(responseHandler);

  // respondSuccessfully(res);
});



// [END YourAction]

if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
  });

  const io = require('socket.io')(server);

  io.on('connection', function(socket) {
  	myEmitter.on('redirect-prompt', function(msg) {
  		io.emit('redirect-to-map');
  	});
  }); 
  // [END server]
}

//module.exports = app;



















// process.env.DEBUG = 'actions-on-google:*';
// var Assistant = require('actions-on-google').ApiAiAssistant;
// var express = require('express');
// var bodyParser = require('body-parser');
// // var window = new window
// var app = express();
// app.set('port', (process.env.PORT || 8080));
// app.use(bodyParser.json({type: 'application/json'}));


// // var audio = new Audio("Knight_Right.mp3");

// // var audio = document.createElement('audio');
// // audio.src = 'Knight_Right.mp3'

// app.set('views', __dirname + '/views');
// app.set('view engine', 'ejs');
// app.get('/', function(request, response) {
//   //response.render('pages/index');
//   response.redirect(301,'https://goo.gl/maps/NAYL5n2TRz12');
// });

// app.post('/',function(req,res){
// 	const assistant = new Assistant({request: req, response: res});
// 	console.log('Request headers: ' + JSON.stringify(req.headers));
// 	console.log('Request body: ' + JSON.stringify(req.body));
// 	res.send({ testing: 'did you get this?' })
	
// 	function responseHandler (assistant) {
//     	assistant.tell('AHH!');
//   	assistant.handleRequest(responseHandler);
//   }
  

//   // function music() {
//   // // audio.play();	
//   // }
  

//  assistant.handleRequest(responseHandler);
// });

// if (module === require.main) {
//   // [START server]
//   // Start the server
//   var server = app.listen(process.env.PORT || 8080, function () {
//     var port = server.address().port;
//     console.log('KaittApp listening on port %s', port);
//   });
// }
// module.exports = app;
