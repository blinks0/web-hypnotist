var textArea = document.getElementById("mainTextArea");
var outputArea = document.getElementById("outputTextArea");
var playButton = document.getElementById("playB");
var stopButton = document.getElementById("stopB");
var downloadB = document.getElementById("downloadB");
var openB = document.getElementById("openB");
var fileInputThing = document.getElementById('files');
var manualB = document.getElementById("manualB");
var shareB = document.getElementById("shareB");
var clearB = document.getElementById("clearB");
var examplesB = document.getElementById("examplesB");
var browserInfo = get_browser_info();
var debugMode = false;
var bodyColor = document.body.style.backgroundColor;
var inputField = document.getElementById("inputField");

var buttonsArray = [playButton, stopButton, clearB, downloadB, openB, shareB, manualB, examplesB];

var saveFile = function() {
  var blob = new Blob([textArea.value], {type: "text/plain;charset=utf-8"});
  var str = textArea.value;
  var rows = str.split("\n");
  var firstLine = rows[0].substring(1);
  saveAs(blob,  firstLine + " - script.txt");
}

var getScriptTitle = function() {
  var str = textArea.value;
  var rows = str.split("\n");
  var firstLine = rows[0].substring(1);
  return firstLine;
}

var setText = function(str) {
  textArea.value = str;
}

// print to output-window
var output = function(str) {
  outputArea.value =  str + "\n" + outputArea.value ;
};

// print error to output-window
var error = function(msg) {
  outputArea.value = "\n!!!!!!!\n!!ERROR!!\n!!!!!!!" +  msg + "\n!!!!!!!\n\n" + outputArea.value ;
};

// for debug only
var debug = function(str) {
  if (debugMode) {
    output(str);
  }
}

var clearOutput = function(){
  outputArea.value = " ";
}

var loadFromAdressBar = function() {
  var adressbar = window.location.href;
  var params = adressbar.split("?");
  debug(params[0]);
  if (params.length > 1){ // if an argument was passed after '?'
    debug(params[1]);
    var decr = decompressString(params[1]); //decrypt string
    setText(decr);
    output("LOADED FROM ADRESS BAR");
  }
}



var compressString = function(str) {
  return LZString.compressToEncodedURIComponent(str);
}

var decompressString = function(str) {
  return LZString.decompressFromEncodedURIComponent(str);
}

var generateLinkToScript = function() {
  var str = textArea.value;
  var encr = compressString(str);
  var address = getCurrentWebAddress() + "#top?" + encr; // maybe need # as well
  return address;
}

var getCurrentWebAddress = function() {
  var adressbar = window.location.href;
  var params = adressbar.split("?");
  var address = params[0].split("#")[0];
  return address;
  //return "http://webhypnotist.x10host.com/" //hardcoded to work with safari maybe?
}


var currentWebAddresReal = function() {
  var adressbar = window.location.href;
  var params = adressbar.split("?");
  var address = params[0].split("#")[0];
  return address;
}
// generates a link to the script
var showLinkToScript = function() {
  var link = generateLinkToScript();
  var wnd = window.open("about:blank", "", "_blank");
  wnd.document.write("<b>Copy and paste link. Yes it's really long," + 
                  " the address contains your entire script after all."+ 
                  " It may be to long to paste into Google Chrome's adress bar,"+ 
                  " but clicking on the link should do the trick. You should " + 
                  " probably make sure it opens in a new window since some browsers have "+
                  "a problem otherwise. <br>You could use a URL-shortener like" + 
                  " <a href='http://www.tinyurl.com' target='_blank'> TinyURL</a> to make it shorter. </b><br><br>");
  wnd.document.write("Link to your script to copy/paste somewhere:<br>");
  wnd.document.write("<a target='_blank' href='" + link +  "'>" + getScriptTitle() + "</a><br><br>");
  wnd.document.write("Link where the full super-long link is written out:<br>");
  wnd.document.write("<a target='_blank' href='" + link +  "'>"+link +"</a>");
}


// to compare strings
var stringEquals = function(str1, str2) {
  return (new String(str1)).valueOf() == (new String(str2)).valueOf();
};

//to get browser onformation
function get_browser_info(){
    var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || []; 
    if(/trident/i.test(M[1])){
        tem=/\brv[ :]+(\d+)/g.exec(ua) || []; 
        return {name:'IE',version:(tem[1]||'')};
        }   
    if(M[1]==='Chrome'){
        tem=ua.match(/\bOPR\/(\d+)/)
        if(tem!=null)   {return {name:'Opera', version:tem[1]};}
        }   
    M=M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
    if((tem=ua.match(/version\/(\d+)/i))!=null) {M.splice(1,1,tem[1]);}
    return {
      name: M[0],
      version: M[1]
    };
 }
 
 function setBackgroundColor(val) {
   document.body.style.backgroundColor = val;
 }
 
 function resetBackgroundColor() {
   document.body.style.backgroundColor = bodyColor;
 }

// to clear the main text area 
var clearScript = function() {
  textArea.value = "";
}

//to replace all occurences of test
String.prototype.replaceAll = function(search, replace)
{
    //if replace is not sent, return original string otherwise it will
    //replace search string with 'undefined'.
    if (replace === undefined) {
        return this.toString();
    }

    return this.split(search).join(replace);
};



//figure out if debug mode
var currWebArd = currentWebAddresReal().substr(0,5);
debugMode = stringEquals(currWebArd, "file:");
if (debugMode) {
  output("DEBUG MODE ON");
}


downloadB.onclick = saveFile;
//downloadB.className = "myButton"
openB.onclick = function(){
  fileInputThing.click();
}
manualB.onclick = function(){
  window.open("manual.html");
}
shareB.onclick = showLinkToScript;
examplesB.onclick = function() {
  window.open("manual.html#examples");
}
clearB.onclick = function() {
  if (confirm("Really clear the entire script? You can't undo this!")){
    clearScript();
  }
}

window.onresize = function() {
  setTextAreaSize();
  setButtonsSize();
}

function setTextAreaSize() {
  var w = window.innerWidth - 60; //compensate for marigin
  var h = window.innerHeight - 100; //compensate for stuff
  textArea.style.width = (w*0.65) + "px";
  outputArea.style.width = (w*0.30) + "px";
  var targetHeight = h * 0.80;
  textArea.style.height = targetHeight + "px";
  outputArea.style.height = targetHeight + "px";
  
}

function setButtonsSize() {
  var n = buttonsArray.length;
  var w = window.innerWidth - 60; //compensate for marigin
  var targetFontSize = ( 0.015 * w )
  var maxFontSize = 14.0;
  if (targetFontSize > maxFontSize){
    targetFontSize = maxFontSize;
  }
  for (var i=0; i<n; i++) {
    buttonsArray[i].style.fontSize = targetFontSize + "px"; ;
  }
}

function setButtonsClass(className) {
   for (var i=0; i<buttonsArray.length; i++) {
    buttonsArray[i].className = className;
  }
}

//disable spellcheck
textArea.spellcheck = false;

// the input-field
inputField.hidden = true;
inputField.onkeypress = function(e){
    if (!e) e = window.event;
    var keyCode = e.keyCode || e.which;
    if (keyCode == '13'){
      theLine = inputField.value;
      lines = theLine.split("\n");
      debug("here with " + lines)
      num = 0;
      speakLineByLineAtNum();
      inputField.value = "";
      
      return false;
    }
  }
///////////

loadFromAdressBar();
setTextAreaSize();
setButtonsSize();

setButtonsClass("myButton2");
