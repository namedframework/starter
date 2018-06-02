const bodyParser = require('body-parser');
const multer = require('multer');
const passport = require('passport');
const lusca = require('lusca');
const connectFlash = require('connect-flash');
const mkdirp = require('mkdirp');
const path = require('path');

const session = require('express-session');
const MongoStore = require('connect-mongo')(session);


module.exports = function (app) {

  app.use( lusca.xframe('SAMEORIGIN') );
  app.use( lusca.xssProtection(true) );


  app.use( bodyParser.json() );
  app.use( bodyParser.urlencoded({ extended: true }) );

  app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: Framework.config.session.secret,
    store: new MongoStore({
      url: Framework.config.session.uri || Framework.config.mongo.uri,
      autoReconnect: true,
    }),
  }));

  app.use( lusca.csrf() );

  app.use(passport.initialize());
  app.use(passport.session());

  require('./passport')(passport);

  app.use( connectFlash() );

  app.use(function (req, res, next) {
    req.upload = function (options) {
      /*
      * multer options
      * dest or storage -->	Where to store the files
      * fileFilter -->	Function to control which files are accepted
      * limits -->	Limits of the uploaded data
      * preservePath -->	Keep the full path of files instead of just the base name
      */
      if (options.destination){
        var opts = {
          destination: function (req, file, cb) {
            var destination = path.resolve(Framework.appPath, options.destination);

            mkdirp(destination, function (err) {
              if (err) console.error(err)
              cb(null, destination);
            });
          }
        };
        if (options.filename){
          opts.filename = options.filename;
        }
        let storage = multer.diskStorage(opts);
        options.storage = storage;
      }
      return multer(options);
    };
    next();
  });

};
