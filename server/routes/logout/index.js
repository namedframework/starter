module.exports = {
  get: function (req, res, next) {
    req.logout();

    delete req.session.redirectUrl;

    res.redirect('/login');

  },
};
