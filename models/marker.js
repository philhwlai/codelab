var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var MarkerSchema = new Schema({
    userName : String,
    note: String,
    videoId: String,
    videoUrl: String,
    videoTitle: String,
    type: String,
    clockTs : String,
    videoTs : String,
}, {strict: false});

module.exports = mongoose.model('marker', MarkerSchema );
