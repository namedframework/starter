// require Framework
var Framework = require('namedframework');

// chdir to app file
process.chdir(__dirname);

global.async = require('async');

global._ = require('lodash');

Framework.appPath = __dirname;

// start Framework
Framework.init();
