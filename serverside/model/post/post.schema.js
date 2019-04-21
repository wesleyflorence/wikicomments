var mongoose = require('mongoose');
var postSchema = mongoose.Schema(
  {
    userId: {type: mongoose.Schema.ObjectId, ref: "User"},
    username: String,
    title: String,
    description: String,
    domain: String,
    dateCreate: {type: Date, default: Date.now()},
    comment: String
  },{collection: "Post"}
);

module.exports = postSchema;