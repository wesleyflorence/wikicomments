var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var FacebookStrategy = require('passport-facebook').Strategy;
var bcrypt = require('bcrypt-nodejs');

module.exports = function(app) {
    app.post('/api/login', passport.authenticate('local'), login);
    app.post ('/api/register', register);
    app.post('/api/logout', logout);
    app.post('/api/loggedin', loggedIn);

    var facebookConfig = {
        clientID     : process.env.FB_CLIENT_ID_WAM,
        clientSecret : process.env.FB_CLIENT_SECRET_WAM,
        callbackURL  : process.env.FB_CALL_BACK_URL_WAM
      };

       // auth with Facebook
    // app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    //     failureRedirect: '/#/login'
    //   }), function(req, res) {
    //     res.redirect('/#/user/' + req.user._id);
    //   });
     // auth with Facebook
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        successRedirect: '/#/profile', 
        failureRedirect: '/#/login' 
    }));

    app.get ('/facebook/login', passport.authenticate('facebook', { scope : 'email' }));
    
    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);
    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));
    
    var userModel = require('../model/user/user.model');
  
    
    function localStrategy(username, password, done) {
        userModel.findByUsername(username).then(
            function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function (err) {
                res.sendStatus(400).send(err);
        });
    }
        
    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel.findUserById(user._id).then(
            function(user){
                done(null, user);
            },
            function(err){
                done(err, null);
            }
        );
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logout();
        res.json("success");
        return;
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel.findByUsername(user.username).then(function (data) {
            if(data){
                res.status(400).send('Username is in use!');
                return;
            } else {
                userModel.createUser(user).then(
                    function(user){
                        if(user){
                            req.login(user, function(err) {
                                if(err) {
                                    res.status(400).send(err);
                                } else {
                                    res.json(user);
                                }
                            });
                        }
                    }
                );
            }
        });
    }

    function facebookStrategy(token, refreshToken, profile, done){
        userModel.findFacebookUser(profile.id)
          .then(
            function(user) {
              if(user) {
                return done(null, user);
              } else {
                var names = profile.displayName.split(" ");
                var newFacebookUser = {
                //   lastName: names[1],
                //   firstName: names[0],
                  username: names[0],
                  facebook: { id: profile.id, token: token } 
                };
                return userModel.createUser(newFacebookUser);
              }
            }, function(err) {
              if (err) {
                return done(err);
              } } );
        // .then(
        //   function(user){
        //     return done(null, user);
        //     }, function(err){
        //     if (err) {
        //       return done(err);
        //     }
        //   }
        //   );
      }

}