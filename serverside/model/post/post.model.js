var mongoose = require('mongoose');

var postSchema = require('./post.schema');
var postModel = mongoose.model("Post",postSchema);

var userModel = require('../user/user.model');

postModel.createPost = createPost;
postModel.findPostById = findPostById;
postModel.findAllPostForUser = findAllPostForUser;
postModel.updatePost = updatePost;
postModel.deletePost = deletePost;
postModel.findAllPosts = findAllPosts;

module.exports = postModel;

function createPost(userId,post) {
    return postModel.create(post)
      .then(
        function (post) {
          userModel.findUserById(userId)
            .then(
              function (user) {
                user.post.push(post);
                userModel.updateUser(userId,user);
              }
            );
          return post;
        }
      )
  }
  
  function findAllPostForUser(userId) {
    return postModel.find({userId:userId});
  }
  
  function findPostById(id) {
    return postModel.findById(id);
  }
  
  function updatePost(id,post) {
    return postModel.findByIdAndUpdate(id,post);
  }
  
  function deletePost(id){
    return postModel.findByIdAndRemove(id);
  }

  function findAllPosts() {
      return postModel.find();
  }