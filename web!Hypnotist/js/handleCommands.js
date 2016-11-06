



////////////////////////
//here handle commands//
///////////////////////

var doCommand = function(str) {
  var command = str.split(" ");
  output("FOUND COMMAND: " + command[0]);
  if (stringEquals(command[0], "pause")){
    var pauseTime = command[1];
    output("PAUSING " + pauseTime + " SECONDS");
    setTimeout(function(){speakLineByLineAtNum();}, pauseTime * 1000);
    return;
  }
  else if (stringEquals(command[0], "sound")){
    var soundName = command[1];
    output("PLAYING " + soundName);
    playMp3Effect2(soundName);
    // may need to wait a little because of this
    setTimeout(function(){speakLineByLineAtNum();},300);
    return;
  }
  else if (stringEquals(command[0], "urlimage")){
    var url = command[1];
    output("VIEW IMAGE " + url);
    setImage(url);
  }
  else if (stringEquals(command[0], "volume")){
    var val = command[1];
    output("SET VOLUME TO:  " + val);
    setVolume(val);
  }
  else if (stringEquals(command[0], "imagesize") || stringEquals(command[0], "imageheight") ){
      var s = command[1];
      output("RESIZE IMAGE TO " + s);
      setImageHeight(s);
  }
  else if (stringEquals(command[0], "rate")){
    var val = command[1];
    setRate(val);
  }
  else if (stringEquals(command[0], "gender")){
    var val = command[1];
    if (stringEquals(val, "male") || stringEquals(val, "m")){
      gender = 0;
    }
    else if (stringEquals(val, "female") || stringEquals(val, "f")){
      gender = 1;
    }
  }
  else if (stringEquals(command[0], "music")){
    var val = command[1];
    output("MUSIC: " + val)
    if (stringEquals(val, "off")) {
      stopMusic();
    }
    else {
      playMusicMp3(val);
    }
  }
  else if (stringEquals(command[0], "youtubemusic")){
    var val = command[1];
    output("YOUTUBE MUSIC: " + val)
    if (stringEquals(val, "off")) {
      stopYoutubeMusic();
    }
    else {
      playYoutubeMusicUrl(val);
    }
  }
  else if (stringEquals(command[0], "youtubemusicvolume")){
    var val = command[1];
    output("YOUTUBE MUSIC VOLUME: " + val)
    var v = parseFloat(val);
    try{setYoutubeMusicVolume(v);}catch(e){}
  }
  else if (stringEquals(command[0], "bgcolor")){
    var val = command[1];
    setBackgroundColor(val)
  }
  //to set voice manually
  else if (stringEquals(command[0], "advancedvoice")){
    var val = command[1];
    advancedVoiceUse = (stringEquals(val, "on"));
  }
  else if (stringEquals(command[0], "voice")){
    var val = command[1];
    manualVoice = findVoiceInArray(voicesArray, val);
  } /////
  
  
  else if (stringEquals(command[0], "noimage")){
    
    setNoImage();
  }
  speakLineByLineAtNum();
};
///////////////////////////////////
///////////////////////////////////