module.exports = {
  get: function (req, res, next) {
    var fbOptions = { callbackURL: '/user/unlink/facebook/callback/', scope: ['email'] };

    // if request cancled or no email response
    if (req.query.rerequest && req.query.rerequest === 'true'){
      fbOptions.authType = 'rerequest';
    }
    req._passport.instance.authenticate('facebook', fbOptions)(req, res, next);
  }
};
