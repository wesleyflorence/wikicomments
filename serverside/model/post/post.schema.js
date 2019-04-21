var mongoose = require('mongoose');
var postSchema = mongoose.Schema(
  {
    userId: {type: mongoose.Schema.ObjectId, ref: "User"},
    title: String,
    description: String,
    url: String,
    dateCreate: {type: Date, default: Date.now()}
  },{collection: "Post"}
);

module.exports = postSchema;