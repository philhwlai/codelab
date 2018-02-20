var express = require('express');
var router = express.Router();
const slack = require('slack');
var MessageModel = require('./message');

exports.channel_history = function(req, res, next) {
  console.log("nothing here yet");
  res.send("nothing ready for the browser yet");
};
