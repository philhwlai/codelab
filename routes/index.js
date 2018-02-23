const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const videos = require('../data/json/videos.json');
const links_list = require('../data/json/links.json');
const linksMachine = require('../ll_modules/mk_utilities/links_machine.js')
const slackTools = require('../ll_modules/slack_tools/slack_tools_controllers.js');

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
    'public/_projects/grids/video/youtube-markers.html'));
})

router.get('/slack', slackTools.channel_history);

router.get('/gifs', linksMachine.gifs);

module.exports = router;
