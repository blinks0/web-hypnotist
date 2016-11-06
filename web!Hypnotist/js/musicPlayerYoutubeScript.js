var ytPlayer
var vidId;

var loadAndPlayYoutubeMusicUrl = function(url) {
  var array = url.split("?");
  if (array.length > 1) {
      var id = array[1].substring(2)
      loadAndPlayYoutubeMusic(id);
  }
  else {
    error("No valid youtube url found in " + url +  "Make sure you didn't use the shortened version of the url.");
  }

}

var loadAndPlayYoutubeMusic = function(id) {
  if (ytPlayer != undefined) {
    showVideo();
    ytPlayer.loadVideoById(id, 1, "small");
  }
  else {
    createYoutubeMusic(id);
  }
}
  
var createYoutubeMusic = function (id) {
	var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
	vidId = id;
}
// 3. This function creates an <iframe> (and YouTube player)
//    after the API code downloads.

function onYouTubeIframeAPIReady() {
  ytPlayer = new YT.Player('musicYT', {
    height: '100',
    width: '100',
    videoId: vidId,
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  ytPlayer.setLoop(true);
}

// 4. The API will call this function when the video player is ready.
function onPlayerReady(event) {
  event.target.playVideo();
}


// 5. The API calls this function when the player's state changes.
//    The function indicates that when playing a video (state=1),
//    the player should play for six seconds and then stop.
var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 3000);
    done = true;
  }
}
function stopYoutubeMusic() {
  ytPlayer.stopVideo();
  hideVideo();
}

function setYoutubeMusicVolume(val) {
  var v = parseFloat(val);
  v = v*100;
  ytPlayer.setVolume(v);
}

function hideVideo() {
  document.getElementById("musicYT").style.visibility = "hidden";
}

function showVideo() {
  document.getElementById("musicYT").style.visibility = "visible";
}
