module.exports = {
  get: function (req, res, next) {
    var googleOptions = { callbackURL: '/user/link/google/callback/', scope: ['email', 'profile'] };

    // if request cancled or no email response
    if (req.query.rerequest && req.query.rerequest === 'true'){
      googleOptions.authType = 'rerequest';
    }
    req._passport.instance.authenticate('google', googleOptions)(req, res, next);
  }
};
