var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

exports.gifs = function(req, res, next){
  var gifsFolder = path.join(__basedir, 'public/gifs');
  fs.readdir(gifsFolder, (err, paths)=>{
    var theGifs = [];
    paths.forEach(path=>{
      if (path !== ".DS_Store") {
        theGifs.push(
          {'title': path,
          'url': ('/gifs/' + path)
          }
        )
      }

    })
    res.render('gifs', { title: 'the LL gifs', gifs: theGifs });
  })
}
