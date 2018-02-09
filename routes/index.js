var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require('path');

/* GET home page. */
router.get('/', function(req, res, next) {
  var theLinks = [];
  var linksFolder = path.join(__basedir, 'public/tests/animejs/examples/anime');
  fs.readdir(linksFolder, (err, paths)=>{
    console.log(JSON.stringify(paths, null, 4));
    paths.forEach(path=>{
      theLinks.push(
        {'title': path,
        'url': ('tests/animejs/examples/anime/' + path)
        }
      )
    })
    res.render('index', { title: 'codeLab', links:theLinks });
  })
});

router.get('/marlon', function(req, res, next){



  var links = [
    {text: "Google", url:"https://www.google.com/"},
    {text: "Amazon", url:"https://www.amazon.com/"},
    {text: "Apple", url:"https://www.apple.com/"}
  ]





  res.render('marlon_view',  {title: 'Marlon Page', data: links});
})


router.get('/videos', function(req, res, next){

  res.sendFile(path.join(__basedir, 'public/pages/videos.html'));
  // res.send('route working');
})


module.exports = router;
