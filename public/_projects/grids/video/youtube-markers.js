var tag = document.createElement('script');
tag.id = 'iframe-demo';
tag.src = 'https://www.youtube.com/iframe_api';
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var logButton = document.querySelector('#logButton');
var likeButton = document.querySelector('#likeButton');
var inButton = document.querySelector('#inButton');
var outButton = document.querySelector('#outButton');
var results = document.querySelector('#result-box');
var player;
var userEvents = [];
var sendButton = document.querySelector('#sendButton');
var nameField = document.querySelector('#name');
var passwordField = document.querySelector('#password');
var playButton = document.querySelector('#playButton');
var pauseButton = document.querySelector('#pauseButton');

function onYouTubeIframeAPIReady() {
  player = new YT.Player('playercontainer', {
      videoId: 'z5rRZdiu1UE',
      width: '383',
      height: '243',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      },
      playerVars: {
        'controls': 0,
        'fs': 0,
        'rel': 0,
        'showinfo': 0,
        'playsinline': true
      }
  });
}

function onPlayerReady(event) {
  console.log("player ready");
}

function onPlayerStateChange(event){
  console.log(event);
}

logButton.addEventListener("click", function(){
  var d = new Date();
  var theClockTime = d.getTime();
  var videoTime = 1000 * player.getCurrentTime();
  var theOffset = videoTime-theClockTime;
  console.log(theOffset);
  console.log(theClockTime);
  var newText = ("logged click at " + player.getCurrentTime());
  var newElement = document.createElement('p');
  newElement.innerHTML = newText;
  results.appendChild(newElement);
  var pw;
  if (!passwordField.value) {
    pw = "none"
  }
  else {
    pw = passwordField.value
  }
  userEvents.push({
    user: nameField.value,
    password: pw,
    eventType: 'beat',
    ts: theClockTime,
    videots: videoTime,
  })
})

likeButton.addEventListener("click", function(){
  var d = new Date();
  var theClockTime = d.getTime();
  var videoTime = 1000 * player.getCurrentTime();
  var theOffset = videoTime-theClockTime;
  console.log(theOffset);
  console.log(theClockTime);
  var newText = ("logged like at " + player.getCurrentTime());
  var newElement = document.createElement('p');
  newElement.innerHTML = newText;
  results.appendChild(newElement);
  var pw;
  if (!passwordField.value) {
    pw = "none"
  }
  else {
    pw = passwordField.value
  }
  userEvents.push({
    user: nameField.value,
    password: pw,
    eventType: 'like',
    ts: theClockTime,
    videots: videoTime
  })
})

inButton.addEventListener("click", function(){
  var d = new Date();
  var theClockTime = d.getTime();
  var videoTime = 1000 * player.getCurrentTime();
  var theOffset = videoTime-theClockTime;
  console.log(theOffset);
  console.log(theClockTime);
  var newText = ("logged in point at " + player.getCurrentTime());
  var newElement = document.createElement('p');
  newElement.innerHTML = newText;
  results.appendChild(newElement);
  var pw;
  if (!passwordField.value) {
    pw = "none"
  }
  else {
    pw = passwordField.value
  }
  userEvents.push({
    user: nameField.value,
    password: pw,
    eventType: 'inPoint',
    ts: theClockTime,
    videots: videoTime
  })
})

outButton.addEventListener("click", function(){
  var d = new Date();
  var theClockTime = d.getTime();
  var videoTime = 1000 * player.getCurrentTime();
  var theOffset = videoTime-theClockTime;
  console.log(theOffset);
  console.log(theClockTime);
  var newText = ("logged out point at " + player.getCurrentTime());
  var newElement = document.createElement('p');
  newElement.innerHTML = newText;
  results.appendChild(newElement);
  var pw;
  if (!passwordField.value) {
    pw = "none"
  }
  else {
    pw = passwordField.value
  }
  userEvents.push({
    user: nameField.value,
    password: pw,
    eventType: 'outPoint',
    ts: theClockTime,
    videots: videoTime
  })
})

sendButton.addEventListener("click", function(){
  var d = new Date();
  var theClockTime = d.getTime();
  nameField.innerHTML
  console.log("JSON request submitted.");
  console.log("submitted by " + nameField.innerHTML + " with password " + passwordField.innerHTML);
  console.log(JSON.stringify(userEvents, null, 4));
  results.innerHTML = "<pre class='no-background'>" + (JSON.stringify(userEvents, null, 4)) + "</pre>";
  var tempText = document.createElement("textarea");
  document.body.appendChild(tempText);
  tempText.value = (JSON.stringify(userEvents, null, 4));
  tempText.select();
  document.execCommand("copy");
  document.body.removeChild(tempText);
});

playButton.addEventListener("click", function(){
  if (!nameField.value || !passwordField.value) {
    var newText = ("Don't forget to type a name and password.");
    var newElement = document.createElement('p');
    newElement.innerHTML = newText;
    results.appendChild(newElement);
  }
  player.playVideo();
})

pauseButton.addEventListener("click", function(){
  player.pauseVideo();
})


function stopVideo() {
  player.stopVideo();
}
