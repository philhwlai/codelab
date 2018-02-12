var Message = require('../models/message')
var async = require('async')
var Shoot = require('../models/shoot')

// Display list of all Authors
exports.message_list = function(req, res, next) {
  Message.find()
    .sort([['user_id', 'ascending']])
    .exec(function (err, list_messages) {
      if (err) { return next(err); }
      //Successful, so render
      res.render('message_list', { title: 'Message List Test', tabTitle: "Message List", list:  list_messages});
    })
};

exports.add_messages = function(req, res, next) {
  console.log("nothing here yet");
};
