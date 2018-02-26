const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const path = require('path');
const videos = require('../data/json/videos.json');
const links_list = require('../data/json/links.json');
const linksMachine = require('../ll_modules/mk_utilities/links_machine.js')
const slackTools = require('../ll_modules/slack_tools/slack_tools_controllers.js');
var Marker = require('../models/marker.js');
/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'codeLab', links: links_list });
});

router.get('/animedemo', function(req, res, next){
  var linksFolder = path.join(__basedir, 'public/_tests/animejs/examples/anime');
  fs.readdir(linksFolder, (err, paths)=>{
    var theLinks = [];
    paths.forEach(path=>{
      theLinks.push(
        {'title': path,
        'url': ('_tests/animejs/examples/anime/' + path)
        }
      )
    })
    res.render('index', { title: 'anime js links', links: theLinks });
  })
})

router.get('/linksdemo', function(req, res, next){
  console.log(JSON.stringify(links_list, null, 4));
  res.render('links_view',  {title: 'Links Page', data: links_list});
})

router.get('/videos', function(req, res, next){
  res.render('videos', {title: 'Video Bookmarks', videoLinks: videos, width: 480, height: 270})
})

router.get('/threejs', function(req, res, next){
  res.sendFile(path.join(__basedir, 'public/thepage/web-projects-2017/atom-ll-workshop/three-tests/index.html'));
})

router.get('/youtube-markers', function(req, res, next){
  res.sendFile(path.join(__basedir,
    'public/_projects/mk/youtube-markers/youtube-markers.html'));
})

router.post('/youtube-data', function(req, res, next){
  console.log("received post request from " + req.body.name);
  console.log(JSON.stringify(req.body));
  var postTs = new Date().getTime();
  console.log("the postTs is " + postTs);
  if (req.body.password==process.env.DEV_PASSWORD) {
    console.log("password match");
  }
  req.body.events.forEach(marker => {
      console.log("creating marker for " + marker.ts);
      var newMarker = new Marker({
        userName : req.body.name,
        note: marker.note,
        videoId: marker.videoId,
        videoUrl: marker.videoUrl,
        videoTitle: marker.videoTitle,
        clockTs : marker.clockTs,
        videoTs : marker.videoTs,
        type : marker.eventType
      })
      console.log(JSON.stringify(newMarker));
      newMarker.save(function(err){
        if (err) { console.log("there was an error"); return next(err); }
      })
  })

  res.redirect('/youtube-markers');

  // var newResult = new CatResult({name: catMechanics[req.body.catId].name
  //   , rating: req.body.points, loadTs: (req.body.loadTs), postTs: postTs});
  // newResult.save((err)=> {console.log("saved result:\n" + JSON.stringify(newResult, null, 5))});
  //
});

router.get('/vimeo-markers', function(req, res, next){
  res.sendFile(path.join(__basedir,
    'public/_projects/mk/vimeo-markers/vimeo-markers.html'));
})

router.post('/vimeo-data', function(req, res, next){
  console.log("received post request from " + req.body.name);
  console.log(JSON.stringify(req.body));
  var postTs = new Date().getTime();
  console.log("the postTs is " + postTs);
  if (req.body.password==process.env.DEV_PASSWORD) {
    console.log("password match");
  }
  req.body.events.forEach(marker => {
      console.log("creating marker for " + marker.ts);
      var newMarker = new Marker({
        userName : req.body.name,
        note: marker.note,
        videoId: marker.videoId,
        videoUrl: marker.videoUrl,
        videoTitle: marker.videoTitle,
        clockTs : marker.clockTs,
        videoTs : marker.videoTs,
        type : marker.eventType
      })
      console.log(JSON.stringify(newMarker));
      newMarker.save(function(err){
        if (err) { console.log("there was an error"); return next(err); }
      })
  })

  res.redirect('/vimeo-markers');

  // var newResult = new CatResult({name: catMechanics[req.body.catId].name
  //   , rating: req.body.points, loadTs: (req.body.loadTs), postTs: postTs});
  // newResult.save((err)=> {console.log("saved result:\n" + JSON.stringify(newResult, null, 5))});
  //
});


router.get('/logger', function(req, res, next){
  res.sendFile(path.join(__basedir,
    'public/_projects/mk/ll-livelogger/livelogger.html'));
})

router.get('/auth', (req, res) =>{
    res.sendFile(__basedir + '/public/_projects/mk/slack/add_to_slack.html')
})

//
// router.get('/auth/redirect', (req, res) =>{
//     var options = {
//         uri: 'https://slack.com/api/oauth.access?code='
//             +req.query.code+
//             '&client_id='+process.env.CLIENT_ID+
//             '&client_secret='+process.env.CLIENT_SECRET+
//             '&redirect_uri='+process.env.REDIRECT_URI,
//         method: 'GET'
//     }
//     request(options, (error, response, body) => {
//         var JSONresponse = JSON.parse(body)
//         if (!JSONresponse.ok){
//             console.log(JSONresponse)
//             res.send("Error encountered: \n"+JSON.stringify(JSONresponse)).status(200).end()
//         }else{
//             console.log(JSONresponse)
//             res.send("Success!")
//         }
//     })
// })

router.get('/slack', slackTools.channel_history);

// router.get('/slackeventconfirmation', function(req, res){
//   res.send(req.body.challenge);
// })

router.post('/slackevents', function(req, res){
  res.send(req.body.challenge);
})

router.get('/slackapp', function(req, res, next){
  res.send('slack app will go here')
});

router.get('/gifs', linksMachine.gifs);

router.post('/llgifs', function(req, res, next){
  console.log("received a req from Slack: \n\n++++++++++++++++++\n\n" + JSON.stringify(req.body));
})

module.exports = router;
