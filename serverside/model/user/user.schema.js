var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  username: String,
  password: String,
  dateCreated:{type: Date, default: Date.now()}
},{collection:'Users'});

module.exports = userSchema;