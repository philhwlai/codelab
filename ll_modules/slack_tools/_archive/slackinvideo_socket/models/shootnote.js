var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ShootnoteSchema = new Schema({
  shootId: String,
  ts: String,
  note: String,
  kp: [{key: Number, ts: Date}]
}
, {strict: false}
);

var Shootnote = mongoose.model('Shootnote', ShootnoteSchema );

module.exports = mongoose.model('Shootnote', ShootnoteSchema );
