module.exports = {

  get: function (req, res, next) {
    async.parallel([
      function (cb) {
        Framework.models.Admin.find({})
        .lean()
        .exec(function (err, admins) {
          res.locals.admins = admins || [];
          cb();
        });
      },
    ], function () {
      res.render('admin/pages/admin/list');
    })
  }
};
