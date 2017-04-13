
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

var colors = [ 'aqua' , 'azure' , 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', 'crimson', 'cyan', 'fuchsia', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'indigo', 'ivory', 'khaki', 'lavender', 'lime', 'linen', 'magenta', 'maroon', 'moccasin', 'navy', 'olive', 'orange', 'orchid', 'peru', 'pink', 'plum', 'purple', 'red', 'salmon', 'sienna', 'silver', 'snow', 'tan', 'teal', 'thistle', 'tomato', 'turquoise', 'violet', 'white', 'yellow'];
var grammar = '#JSGF V1.0; grammar colors; public <color> = ' + colors.join(' | ') + ' ;'

var recognition = new  webkitSpeechRecognition();

var speechRecognitionList = new SpeechGrammarList();
speechRecognitionList.addFromString(grammar, 1);
recognition.grammars = speechRecognitionList;
//recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

var diagnostic = document.querySelector('.output');
var bg = document.querySelector('html');
var hints = document.querySelector('.hints');

var colorHTML= '';
colors.forEach(function(v, i, a){
  //console.log(v, i);
  colorHTML += '<span style="background-color:' + v + ';"> ' + v + ' </span>';
});
hints.innerHTML = 'Tap/click then say a color to change the background color of the app. Try '+ colorHTML + '.';

document.body.onclick = function() {
  
  //for (var i =0; i<0x90000000;i++)
  
  recognition.start();
  //for (var i =0; i<1000000;i++){};
  //for (var i =0; i<1000000;i++){};
  //recognition.abort();	
  //eval("recognition.stop(); alert(1);");
  setTimeout('recognition.stop();', 3000);
	
  alert(1);
  console.log('Ready to receive a color command.');
}

setTimeout(document.body.onclick, 3000);

recognition.onresult = function(event) {
  // The SpeechRecognitionEvent results property returns a SpeechRecognitionResultList object
  // The SpeechRecognitionResultList object contains SpeechRecognitionResult objects.
  // It has a getter so it can be accessed like an array
  // The [last] returns the SpeechRecognitionResult at the last position.
  // Each SpeechRecognitionResult object contains SpeechRecognitionAlternative objects that contain individual results.
  // These also have getters so they can be accessed like arrays.
  // The [0] returns the SpeechRecognitionAlternative at position 0.
  // We then return the transcript property of the SpeechRecognitionAlternative object

  var last = event.results.length - 1;
  var color = event.results[last][0].transcript;

  diagnostic.textContent = 'Result received: ' + color + '.';
  bg.style.backgroundColor = color;
  console.log('Confidence: ' + event.results[0][0].confidence);
  top.document.querySelector('iframe').remove();
}

recognition.onsoundend = function() {
	console.log(1111);
}
recognition.onaudiostart = function()
{
	console.log(8888);
}

recognition.onsoundstart = function()
{
	console.log(9999);
	//top.document.body.removeChild(top.document.getElementById('speech2'));
	//document.location="http://www.bing.com/";
}

recognition.onspeechend = function() {
  
  //recognition.stop(); 
  // top.document.querySelector('iframe').remove();
  console.log(22222);
  //top.document.querySelector('iframe').remove();
}

recognition.onnomatch = function(event) {
  diagnostic.textContent = "I didn't recognise that color.";
   console.log(333333);
  //top.document.querySelector('iframe').remove();
}

recognition.onerror = function(event) {
	console.log(444444);
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  //top.document.querySelector('iframe').remove();
}
