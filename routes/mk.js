const express = require('express');
const router = express.Router();
const request = require('request');
const fs = require('fs');
const path = require('path');
const videos = require('../data/json/videos.json');
const mk_links_list = require('../data/json/mk_links.json');
var Marker = require('../models/marker.js');
var SlackEvent = require('../models/slack_event.js');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'mk codeLab links', links: mk_links_list });
});

router.get('/cellotap', function(req, res, next) {
  res.sendFile(path.join(__basedir, '/public/_projects/cello-tap/index.html'));
})

router.get('/cello-tap', function(req, res, next) {
  res.sendFile(path.join(__basedir, '/public/_projects/cello-tap/index.html'));
})

router.get('/threejs', function(req, res, next){
  res.sendFile(path.join(__basedir, 'public/thepage/web-projects-2017/atom-ll-workshop/three-tests/index.html'));
})

module.exports = router;
