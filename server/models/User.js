const bcrypt = require('bcryptjs');

module.exports = {
  // schema options
  // http://mongoosejs.com/docs/guide.html#options
  options: {
    timestamps: true
  },

  // schema fields
  // http://mongoosejs.com/docs/guide.html
  schema: {
    email: {
      type: String, required: true,
      trim: true, unique: true,
      match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,

    facebook: {},
    twitter: {},
    google: {},
    github: {},
    instagram: {},
    linkedin: {},
    steam: String,
    name: String,
    gender: String,
    location: String,
    website: String,
    picture: String
  },

  statics: {
    encryptPassword: function(password, done) {
      bcrypt.genSalt(10, function(err, salt) {
        if (err) {
          return done(err);
        }

        bcrypt.hash(password, salt, function(err, hash) {
          done(err, hash);
        });
      });
    },
    validatePassword: function(password, hash, done) {
      bcrypt.compare(password, hash, function(err, res) {
        done(err, res);
      });
    },
  },
};
