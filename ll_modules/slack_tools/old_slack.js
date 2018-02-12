var express = require('express');
var router = express.Router();
const slack = require('slack');
var MessageModel = require('./message');

function getDisplayName(userId) {
 for (var i = 0; i < usersOutput.members.length; i++) {
  if (usersOutput.members[i].id = userId) {
   return usersOutput.members[i].profile.display_name_normalized;
  }
 }
}

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Slack Functions' });
});

// get a list of the users
router.get('/users', function(req, res, next) {
  slack.users.list({token: process.env.SLACK_TOKEN}, (err, data) => {
    console.log(JSON.stringify(data, null, 4));
      res.render('list_users', { title: 'Slack Users List', tabTitle: 'Slack Users List', list: data.members, listTitle: "users and ids"})
  });
});


router.get('/install', function(req, res, next){
  res.send('slack signup will go here')
});

// get a list of the channels
router.get('/channels', function(req, res, next) {
  slack.channels.list({token: process.env.SLACK_TOKEN}, (err, data) => {
    console.log("\n\n\n\n\n\n\n\n\n");
    console.log(JSON.stringify(data, null, 4));

      res.render('list_channels', { title: 'Slack Channels List', tabTitle: 'Slack Channels List', list: data.channels, listTitle: "channels and ids"})
  });
});

// get a list of messages from a specified channel
router.get('/channels/:channel', function(req, res, next) {
  slack.channels.history({token: process.env.SLACK_TOKEN, channel: req.params.channel, count: 200}, (err, data) => {
      var sortedList = data.messages.sort(function(a,b){
            return (parseFloat(a.ts) - parseFloat(b.ts));
          });
      sortedList.forEach(message => {
        console.log(JSON.stringify(message, null, 4));
        console.log("trying to save message: ");
        var newMessage = new MessageModel(message);
        newMessage.save((err)=> {console.log("saved message")});
      });
  slack.chat.postMessage({token: process.env.SLACK_TOKEN, channel: req.params.channel, text: "just shipped history of this channel"}, (err, data) => {});
      res.render('channel_history', { title: 'Channel History', tabTitle: 'Channel History', channel: req.params.channel, list: sortedList})
  });

});

router.post('/events', function(req, res, next) {
  console.log("got a post");
  console.log(req.body.event.username + "just posted a message");
  if (req.body.event.username !== "slackinvideo") {
    console.log("\n\nnow let's try to post it to " + req.body.event.channel + "\n\n");
    console.log("\n\n\nnot posting this time\n\n\n");
    // slack.chat.postMessage({token: process.env.SLACK_TOKEN, channel: req.body.event.channel, text: ("got it, and by it I mean the message from " + req.body.event.user + " in which they wrote '" + req.body.event.text +  "'.")}, (err, data) => {
    //   if (err) {
    //     console.log(err);
    //     console.log("did the error log from the if statement?");
    //   }
    //   else {
    //     console.log("hope that message posted");
    //   }
    // })
  }
  else {
    console.log("slackinvideo just posted, but we'll ignore it");
  }
  var newMessage = new MessageModel(req.body.event);
  newMessage.save((err)=> {console.log("saved message")});
    console.log(req.body);
    console.log(req.body.event);
});


module.exports = router;
