var express = require('express');
var router = express.Router();
var ShootNote = require('../models/shootnote');



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Shoot Notes' });
});


var initialQuery = ShootNote.find().
                    limit(5).
                    sort({ts: -1});

router.get('/notes', (req, res) => {
  initialQuery.exec((err, notes) => {
  // Note.find({}, (err, notes) => {
  res.send(notes);

  })
})


router.post('/notes', (req, res) => {
  console.log(JSON.stringify(req.body, null, 8));
  // var noteObject = JSON.parse(req.body.theJsonString)
  // console.log(JSON.stringify(noteObject, null, 8));
  // console.log("now trying to restringify the noteObject " + JSON.stringify(noteObject));
  var note = new ShootNote(req.body);
  console.log("\n\nin the post notes and trying to log kp");
  console.log(JSON.stringify(note.kp));
  note.save((err) => {
    if (err) {
    res.sendStatus(500)
    }
    req.io.sockets.emit('shootnote', req.body);
    console.log("in note.save and just emitted note and here's the req.body " + req.body);
    res.sendStatus(200);
  })
});

module.exports = router;
