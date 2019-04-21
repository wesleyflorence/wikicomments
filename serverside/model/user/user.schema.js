var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  dateCreated:{type: Date, default: Date.now()},
  facebook : {
    token: String,
    id: String
  }
},{collection:'Users'});

module.exports = userSchema;