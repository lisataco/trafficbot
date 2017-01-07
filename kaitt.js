var express = require('express');
var kaitt = express();
var audio = audio("Knight_Right.mp3");

kaitt.post(function(req,res){
window.open("https://goo.gl/maps/NAYL5n2TRz12")	;
audio.play();

});

kaitt.listen(5000, function(){
	console.log('Kaitt app listening on port 5000!');
});
