// Get the dependencies

const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const app = express();

const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');


app.use(session({
  secret: 'this is a secret',
  resave: true,
  saveUninitialized: true
}));

app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Point static path to dist -- For building -- REMOVE
app.use(express.static(path.join(__dirname, 'dist/wiki-comments-angular')));
// app.use(express.static(path.join(__dirname, 'public')));

// CORS
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  next();
});

const port = process.env.PORT || '3200';
app.set('port', port);


// Create HTTP server
const server = http.createServer(app);
server.listen( port , () => console.log('Running on port 3200'));

// var connectionString = 'mongodb://127.0.0.1:27017/wiki';
// var connectionString = 'mongodb://heroku_x5h3vp7m:jsFshmWrnm4k@ds015720.mlab.com:15720/heroku_x5h3vp7m';
var connectionString = process.env.MONGODB_URI;
var mongoose = require("mongoose");
mongoose.Promise = global.Promise;
const client = mongoose.connect( connectionString, { useNewUrlParser: true });

//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

require('./serverside/app')(app);
