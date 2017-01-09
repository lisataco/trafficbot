'use strict';

//process.env.DEBUG = 'actions-on-google:*';
let Assistant = require('actions-on-google').ApiAiAssistant;
let express = require('express');
let bodyParser = require('body-parser');

let app = express();
app.use(bodyParser.json({type: 'application/json'}));

//app.set('views', __dirname + '/views');
//app.set('view engine', 'ejs');

// [START YourAction]

app.get('/',(req,res) =>{
	//res.status(200).send('Welcome! This is your Autonomous Vehicle - K.AI.T.T.');
	//res.render('pages/index');
	res.redirect(301,'https://goo.gl/maps/NAYL5n2TRz12');
	res.send({ testing: 'did you get this?' })
});

app.post('/', function (req, res) {
  const assistant = new Assistant({request: req, response: res});
  console.log('Request headers: ' + JSON.stringify(req.headers));
  console.log('Request body: ' + JSON.stringify(req.body));

  //Fulfill action business logic
  function responseHandler (assistant) {
    // Complete your fulfillment logic and send a response
    assistant.tell('Hello, World!');
  }

  assistant.handleRequest(responseHandler);
});



// [END YourAction]

if (module === require.main) {
  // [START server]
  // Start the server
  let server = app.listen(process.env.PORT || 8080, function () {
    let port = server.address().port;
    console.log('App listening on port %s', port);
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
