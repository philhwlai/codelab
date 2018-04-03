var userEvents = [];
var currentVideoId = '201940092'
var currentVideoTitle = 'TranscriptStory Clips'
var currentVideoUrl = 'https://vimeo.com/201940092'
var playercontainer = document.querySelector("#player");
var playerOverlay = document.querySelector("#player-overlay");
var vimeoElement = document.createElement('iframe')
var options = {
        id: currentVideoId,
        width: 560,
        height: 315,
        loop: true
  };

var player = new Vimeo.Player('player', options);
  player.setVolume(0);
  player.on('play', function() {
    console.log('played the video!');
    player.getVideoTitle().then(function(title) {
        console.log('title:', title);
        currentVideoTitle = title;
      });

    player.getVideoUrl().then(function(url) {
        console.log('url:', url);
        currentVideoUrl = url;
        // url = the vimeo.com url for the video
      })
        .catch(function(error) {
          switch (error.name) {
              case 'PrivacyError':
                  // the url isn’t available because of the video’s privacy setting
                  break;

              default:
                  // some other error occurred
                  break;
          }
      });
});

playerOverlay.addEventListener("click", function(event){
  console.log(event.clientX + ", " + event.clientY);
})
