module.exports = {
  get: function (req, res, next) {
    async.parallel([
      function (cb) {
        Framework.models.Admin.count()
        .exec(function (err, adminCount) {
          res.locals.adminCount = adminCount || 0;
          return cb();
        })
      },
      function (cb) {
        Framework.models.User.count()
        .exec(function (err, userCount) {
          res.locals.userCount = userCount || 0;
          return cb();
        })
      },
    ], function () {
      res.render('admin');
    })
  }
};
