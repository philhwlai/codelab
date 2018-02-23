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

function onYouTubeIframeAPIReady() {
  player = new YT.Player('playercontainer', {
      videoId: 'z5rRZdiu1UE',
      width: '383',
      height: '243',
      events: {
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange,
      }
  });
}

function onPlayerReady(event) {
  event.target.playVideo();
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
  userEvents.push({
    eventType: 'beat',
    ts: theClockTime,
    videots: videoTime
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
  userEvents.push({
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
  userEvents.push({
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
  userEvents.push({
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
});



function stopVideo() {
  player.stopVideo();
}
