
module.exports = {
  get: function (req, res, next) {
    var googleOptions = { callbackURL: '/signup/google/callback/', scope: ['email', 'profile'] };

    if (req.query.rerequest && req.query.rerequest === 'true'){
      googleOptions.authType = 'rerequest';
    }
    req._passport.instance.authenticate('google', googleOptions)(req, res, next);
  },

};
