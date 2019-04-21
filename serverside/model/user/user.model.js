var mongoose = require('mongoose');
var userSchema = require('./user.schema');
var userModel = mongoose.model("User",userSchema);

userModel.createUser = createUser;
userModel.findUserById = findUserById;
userModel.findByUsername = findByUsername;
userModel.findByCredentials = findByCredentials;
userModel.updateUser = updateUser;
userModel.deleteUser = deleteUser;
userModel.findFacebookUser = findFacebookUser;

module.exports = userModel;

function findFacebookUser(facebookId) {
  return userModel.findOne({"facebook.id": facebookId});
}

function createUser(user) {
    return userModel.create(user);
  }
  
  function findUserById(id) {
    return userModel.findById(id);
  }
  
  function findByUsername(username) {
    return userModel.findOne({username:username});
  }
  
  function findByCredentials(username,password){
    return userModel.findOne({username:username,password:password});
  }
  
  function updateUser(userId,user) {
    return userModel.findByIdAndUpdate(userId,user);
  }
  
  function deleteUser(userId){
    return userModel.findByIdAndRemove(userId);
  }