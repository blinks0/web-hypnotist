   //////// script start here
var rate = 1.0;
var langFemale = "en-US";
var langMale = "en-GB";
var volume = 1.0;
var gender = 1; // 1 for female, 0 for male
var googleChromeUsed;
var safariUsed;
var lines; // should be array with all lines to be handled


var num = 0;
var mainImage = document.getElementById("imageID");
var imageW = 500, imageH = 500;
var stopped = false;
var music = document.createElement("audio");
var soundEffect = document.createElement("audio");

//voices
var voicesArray;
var femaleVoice;
var maleVoice;
var manualVoice;  ////special thing
var advancedVoiceUse = false; ////this to

// just speak line set
var speakLine = function (line){
  var msg = prepareUtterance(line);
  window.speechSynthesis.speak(msg);
};

var prepareUtterance = function(line) {
  var msg = new SpeechSynthesisUtterance(line);
  msg.rate = rate;
  if (advancedVoiceUse) { // hidden special feature
    msg.voice = manualVoice;
  }
  else if (googleChromeUsed || safariUsed) { // here is to set the voice to use
    msg.voice = setVoiceToUse();
  }
  else {
    msg.lang = setLanguageToVoice();
  }
  msg.volume = volume;
  return msg;
}


// set volume of speech
var setVolume = function(val) {
  var v = parseFloat(val);
  if (v > 2){
   return; 
  }
  volume = v;
};

// set rate of speech
var setRate = function(val) {
  var v = parseFloat(val);
  if (v > 70) { // if super-large
    rate = v/180;
  }
  else if(v < 2){
    rate = v;
  }
};

var setLanguageToVoice = function() {
  if (gender > 0) {
    return langFemale;
  }
  else {
    return langMale;
  }
}

var setVoiceToUse = function() {
   if (gender > 0) {
    return femaleVoice;
  }
  else {
    return maleVoice;
  }
}

var setMusic = function(name) {
  music.src = name;
  music.loop = true;
  music.currentTime = 0;
}

var startMusic = function() {
  music.play();
}

var stopMusic = function() {
  try {
    music.pause();
    music.currentTime = 0;  
  } catch(e) {}
  try {
    stopYoutubeMusic();
  } catch (e) {};
 
}

var playMusicMp3 = function(name) {
  setMusic("music/" + name + ".mp3");
  startMusic();
}

var playYoutubeMusicUrl = function(url) {
  try {
    stopMusic();
  } catch (e) {};
  loadAndPlayYoutubeMusicUrl(url);
}





// start the real reading
var startSpeakingLineByLine = function() {
  clearOutput();
  var start = textArea.selectionStart;
  var end = textArea.selectionEnd;
  debug("SELECTED: " + start + " to " + end);
  var str;
  
  if (start == end){
      str = textArea.value;
  }
  else {
    str = textArea.value.substring(start, end);
  }

  lines = str.split("\n");
  num = 0;
  stopped = false;
  rate = 1;
  volume = 1;
  speakLineByLineAtNum();
};

var speakLineByLineAtNum = function() {
  if (window.speechSynthesis.speaking) { //if still speaking, wait
    setTimeout(function(){speakLineByLineAtNum();}, 100);
    return;
  }
  
  if (stopped || num == lines.length) { // done here
    setStandardValuesForSession();
    return;
  }

  debug("FOUND LINE: " + lines[num]);
  var str = lines[num];
  num = num + 1;
  if ( stringEquals(str.substring(0,1), "!") ){ // FOUND COMMAND
    str = str.substring(1);
    try{ // try to perform command
      doCommand(str);
    }catch(e){
      error("Command: '" + lines[num-1] + "' failed.");
      setTimeout(function(){speakLineByLineAtNum();}, 100);
    };
    
  }
  else if ( stringEquals(str.substring(0,1), "%") ){
    output("FOUND COMMENT");
    setTimeout(function(){speakLineByLineAtNum();}, 10);
    return;
  }
  else if (str.length > 0) {
    output("SPEAKING LINE: " + str);
    debug("Length: " +  str.length);
    var linelen = str.length;
    if (linelen > 200) {
      debug("WARNING: Long text line. May fail due to Web-Speech API problem with long lines.");
      tryChunks(str);
      return; // and done here now, trychunks will do the rest.
    }
    speakLine(str);
    setTimeout(function(){speakLineByLineAtNum();}, 100);
  } else {
    setTimeout(function(){speakLineByLineAtNum();}, 500);
  }
  
};

//try to handle chunks
function tryChunks(str) {
  str = str.replaceAll(". ", "\n");
  str = str.replaceAll(", ", "\n");
  var tryLines = str.split("\n");
  tryChunksHelper(tryLines, 0);
}

function tryChunksHelper(arr, n) {
  if (stopped){
    speakLineByLineAtNum();
    return;
  }
  if (n >= arr.length){ //then we are done 
    setTimeout(function(){speakLineByLineAtNum();}, 100);
    return;
  }
  if (window.speechSynthesis.speaking) { //if still speaking, wait
    setTimeout(function(){tryChunksHelper(arr, n);}, 100);
    return;
  }
  var s = arr[n];
  speakLine(s);
  setTimeout(function(){tryChunksHelper(arr, n+1);}, 100);
}
////////////

function setStandardValuesForSession() {
    setNoImage(); //Set STANDARDVALUES
    stopMusic();
    resetBackgroundColor();
    try{setYoutubeMusicVolume(1); stopYoutubeMusic();}catch(e){}
    setVolume(1);
    gender = 1; // female standard still
    stopped = false;
    advancedVoiceUse = false;
}

var playWav = function(fileName) {
  var snd = new Audio("sounds/" + fileName + ".wav"); // buffers automatically when created
  snd.play();
};

var playMp3Effect = function(fileName) {
  var snd = new Audio("sounds/" + fileName + ".mp3"); // buffers automatically when created
  snd.play();
};

var playMp3Effect2 = function(fileName) {
   soundEffect.src = "sounds/" + fileName + ".mp3";
   soundEffect.currentTime = 0;
   soundEffect.play();
}

var setImage = function(imageSrc) {
  mainImage.src = imageSrc;
  setImageHeight(imageH);
};
var setNoImage = function(){
  mainImage.src = "images/transparent.png";
  mainImage.height = 0;
};

var setImageWidth = function(size) {
  mainImage.width = size;
  imageW = size;
};

var setImageHeight = function(size) {
  mainImage.height = size;
  imageH = size;
};

var stopSpeaking = function() {
  stopped = true;
  window.speechSynthesis.cancel();
};

var showVoices = function() {
  var voices = window.speechSynthesis.getVoices();
  for (var i=0; i<voices.length; i++) {
    output(voices[i].name + " " + voices[i].lang);
  }
};

function getVoiceWithName(name) {
  var voices = window.speechSynthesis.getVoices();
  return voices.filter(function(voice) { return voice.name == name; })[0];
}

// set voices array handle 
// also sets female voice and male voice
function getVoicesArray() {
  voicesArray = window.speechSynthesis.getVoices();
  if (voicesArray.length == 0) {
    debug("No voices found, try again");
    setTimeout(function(){getVoicesArray();}, 1000); 
    return;
  }
  else {
    //if (debugMode){showVoices();}
    if (googleChromeUsed) {
      femaleVoice = tryToFindGoogleVoicesFemale();
      maleVoice = tryToFindGoogleVoicesMale();
      if (femaleVoice == null || maleVoice == null) {
        debug("Google voices not found!");
        googleChromeUsed = false;       
      }
    }
    else if (safariUsed) {
      femaleVoice = tryToFindSafariVoicesFemale();
      maleVoice = tryToFindSafariVoicesMale();
      if (femaleVoice == null || maleVoice == null) {
            safariUsed = false;
            debug("Safari voices not found");
      }
    }
  }
  debug("Male: " + maleVoice); debug("Female: " + femaleVoice);
  if (maleVoice != null && femaleVoice != null) {
      output("Found voices: '" + femaleVoice.name + "' and '" + maleVoice.name + "'.");
  } 
}

// finding voices ////
function tryToFindGoogleVoicesMale() {
  var testVoices = ["Tom", "Daniel", "Google UK English Male"];
    var voice = null;
    var i = 0;
    while (voice == null && i < testVoices.length) {
      voice = findVoiceInArray(voicesArray, testVoices[i]);
      i = i+1;
    }
    return voice;
}

function tryToFindSafariVoicesMale(){
  var testVoices = ["Tom", "Daniel"];
    var voice = null;
    var i = 0;
    while (voice == null && i < testVoices.length) {
      voice = findVoiceInArray(voicesArray, testVoices[i]);
      i = i+1;
    }
    return voice;
}

function tryToFindGoogleVoicesFemale() {
  var testVoices = ["Alison", "Ava", "Kate", "Samantha", "Jill", "Karen", "Fiona", "Google US English", "Google UK English Female"];
    var voice = null;
    var i = 0;
    while (voice == null && i < testVoices.length) {
      voice = findVoiceInArray(voicesArray, testVoices[i]);
      i = i+1;
    }
    return voice;
}

function tryToFindSafariVoicesFemale(){
  var testVoices = ["Alison", "Ava", "Kate", "Samantha", "Jill", "Karen", "Fiona"];
    var voice = null;
    var i = 0;
    while (voice == null && i < testVoices.length) {
      voice = findVoiceInArray(voicesArray, testVoices[i]);
      i = i+1;
    }
    return voice;
}

function findVoiceInArray(array, voiceName) {
  debug("Lookin for " + voiceName);
  for (var i=0; i<array.length; i++) {
    var voice = array[i];
    var str = voice.name;
    if (stringEquals(str, voiceName)){
      debug("FOUND: " + voice.name);
      return voice;
    }
  }
  debug("No voice found :" + voiceName);
  return null;
}

function findStandardVoicesToUse() {
  googleChromeUsed = false;
  safariUsed = false;
  //standard Language set
  output(browserInfo.name + " detected");
  if (stringEquals(browserInfo.name, "Chrome")) {
    langFemale = "en-US";
    langMale = "en-GB";
    googleChromeUsed = true;
    getVoicesArray();
  } else if (stringEquals(browserInfo.name, "Safari")) {
    langFemale = "en-GB";
    langMale = "en-US";
    output("--------");
    output("You are using " + browserInfo.name);
    output("OBSERVE: Google Chrome is recommended as browser here. Safari has a problem loading longer scripts via the address-bar. Other than that Safari should work for most things, but Chrome is still recommended.");
    output("--------");
    safariUsed = true;
    getVoicesArray();
  } else {
    alert("OBSERVE: Google Chrome (or Apple Safari on a Mac) is strongly recommended as browser here. Things will probably not not work otherwise. You are using " + browserInfo.name + ".");
    langFemale = "en-US";
    langMale = "en-GB"
    output("--------");
    output("You are using " + browserInfo.name);
    output("OBSERVE: Google Chrome (or in worst case Apple Safari on a Mac) is strongly recommended as browser here. Things may not work otherwise.")
    output("--------");
  }
}
////////////////////////

//button bind function
playB.onclick = startSpeakingLineByLine;
stopB.onclick = stopSpeaking;


findStandardVoicesToUse();
//setTimeout(function(){stopVideo()}, 6000);

setNoImage();



