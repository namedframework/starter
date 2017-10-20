module.exports = function (req, res, next) {

  if (req.isAuthenticated()){
    return next();
  }
  req.flash('error', 'Login to access this page.')
  res.redirect('/login');
};
