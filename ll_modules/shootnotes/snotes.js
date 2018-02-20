const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));


var Note = mongoose.model('Note', {
  shootId: String,
  ts: String,
  note: String,
  // kp: [{key: String, ts: Date}]
})

app.get('/notes', (req, res) => {
  Note.find({}, (err, notes) => {
    res.send(notes);
  })


})

app.post('/notes', (req, res) => {
  console.log(JSON.stringify(req.body, null, 8));
  var note = new Note(req.body);
  console.log("\n\nin the post notes and trying to log kp");
  console.log(JSON.stringify(note.kp));
  note.save((err) => {
    if (err) {
      sendStatus(500)
    }
    io.emit('note', req.body);
    // console.log("in note.save and just emitted note and here's the req.body " + req.body);
    res.sendStatus(200);
  })

})

io.on('connection', (socket) => {
  console.log("user connected");
})

mongoose.connect(process.env.DB_URL, {useMongoClient: true}, (err) => {
  console.log("mongo db connection", err);
});

var server = http.listen(3000, () => {
  console.log("server listening on " + server.address().port);
});
