'use strict';

module.exports.mongo = {
  /*
  # mongodb://[username:password@]host[:port][/[database][?options]]
  # https://docs.mongodb.com/manual/reference/connection-string/
  */
  uri: process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/namedframework-starter',
};
