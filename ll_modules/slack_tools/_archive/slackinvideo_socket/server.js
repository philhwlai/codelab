// 'use strict';
//
// const express = require('express');
// const socketIO = require('socket.io');
// const path = require('path');
// const bodyParser = require('body-parser');
// const mongoose = require('mongoose');
// var app = express();
// var http = require('http').Server(app);
// require('dotenv').config();
// const PORT = process.env.PORT || 3000;
// // const INDEX = path.join(__dirname, 'index.html');
// var shootnotes = require('./routes/shootnotes');
//
// var server = http.listen(PORT, () => {
//     console.log("server listening on " + server.address().port);
//   });
//
// const io = socketIO(server);
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'ejs');
//
// app.use(express.static(path.join(__dirname, 'public')));
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));
//
// app.use(function(req,res,next){
//     req.io = io;
//     next();
// });
//
// app.use('/shootnotes', shootnotes);
//
// io.on('connection', (socket) => {
//   console.log('Client connected');
//   socket.on('disconnect', () => console.log('Client disconnected'));
// });
//
// var Note = mongoose.model('Note', {
//   shootId: String,
//   ts: String,
//   note: String,
//   kp: [{key: Number, ts: Date}]
// })
//
// var initialQuery = Note.find().
//                     limit(5).
//                     sort({ts: -1});
//
// app.get('/notes', (req, res) => {
//   initialQuery.exec((err, notes) => {
//   // Note.find({}, (err, notes) => {
//   res.send(notes);
//   })
//
// })
//
//
//
// app.post('/notes', (req, res) => {
//   console.log(JSON.stringify(req.body, null, 8));
//   // var noteObject = JSON.parse(req.body.theJsonString)
//   // console.log(JSON.stringify(noteObject, null, 8));
//   // console.log("now trying to restringify the noteObject " + JSON.stringify(noteObject));
//   var note = new Note(req.body);
//   console.log("\n\nin the post notes and trying to log kp");
//   console.log(JSON.stringify(note.kp));
//   note.save((err) => {
//     if (err) {
//     res.sendStatus(500)
//     }
//     io.emit('note', req.body);
//     // console.log("in note.save and just emitted note and here's the req.body " + req.body);
//     res.sendStatus(200);
//   })
//
// })
//
//
// mongoose.connect(process.env.DB_URL, {useMongoClient: true}, (err) => {
//   console.log("mongo db connection", err);
// });
