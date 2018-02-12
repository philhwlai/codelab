var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MessageSchema = new Schema({
    ts: String,
    timestamp: Date,
    user_id: String,
    user_name: String,
    text: String,
    slackJson: String
}
, {strict: false}
);

var Message = mongoose.model('Message', MessageSchema );

module.exports = mongoose.model('Message', MessageSchema );
