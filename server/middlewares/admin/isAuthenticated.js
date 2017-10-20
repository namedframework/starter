module.exports = function (req, res, next) {
  async.series([
    // validate
    function (cb) {
      if (
        Framework.utils.isEmpty(req.session) ||
        Framework.utils.isEmpty(req.session.admin) ||
        req.session.admin.useragent !== req.headers["user-agent"]
      ){
        return cb("Security check  failed!");
      }
      cb();
    },
    function (cb) {
      Framework.models.Admin.findById(req.session.admin.id, '-password')
      .lean()
      .exec(function (err, admin) {
        if(err || !admin){
          return cb('Login as admin to get access.');
        }
        if (admin.securityHash === undefined || admin.securityHash !== req.session.admin.securityHash){
          return cb('Security check  failed!!');
        }
        delete admin.securityHash;
        req.admin = admin;
        res.locals.admin = admin;
        return cb();
      });
    }
  ], function (err) {
    if(err){
      req.session.redirectUrl = req.originalUrl;
      req.flash('error', err);
      return res.redirect("/login/admin");
    }
    return next();
  })


};
