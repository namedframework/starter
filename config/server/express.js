const multer = require('multer');
const passport = require('passport');
const lusca = require('lusca');
const connectFlash = require('connect-flash');
const mkdirp = require('mkdirp');
const path = require('path');

module.exports = function (app) {

  // app.use(require('express-status-monitor')());
  // app.use( require('compression')() );
  // app.use(require('morgan')('dev'));

  // app.use(require('express-validator')());


  // app.use( lusca.csrf() );
  app.use( lusca.xframe('SAMEORIGIN') );
  app.use( lusca.xssProtection(true) );


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
