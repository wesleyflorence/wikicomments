module.exports = function(app) {
    app.post("/api/user/:userId/article", createPost);
    // app.get("/api/user/:userId/post", findAllPostsForUser);
    app.get("/api/post/:postId", findPostById);
    app.get("/api/post", findAllPosts);
    // app.put("/api/post/:postId", updatePost);
    // app.delete("/api/post/:postId", deletePost);
    var postModel = require('../model/post/post.model');

    function createPost(req, res) {
        console.log("HELLO");
        var userId = req.params.userId;
        var post = req.body;
        postModel.createPost(userId,post)
        .then(
          function (post) {
            res.json(post);
          },
          function (error) {
            res.statusCode(400).send(error);
          }
        );
    }

    function findAllPosts(req, res) {
        postModel.findAllPosts().then(
            function(post){
                res.json(post);
            },
            function (err) {
                res.statusCode(400).send(err);
            }
        );
    }

    function findPostById(req, res) {
        var postId = req.params.postId;
        postModel.findPostById(postId).then(
        function(post){
          res.json(post);
        },
        function (err) {
          res.statusCode(400).send(err);
        }
      );
    }
}