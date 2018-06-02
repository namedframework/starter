module.exports = function (req, res, next) {
  // url
  res.locals.url = req.originalUrl;
  
  // authenticated user
  if (req.isAuthenticated()){
    res.locals.isAuthenticated = req.isAuthenticated();
    res.locals.user = req.user;
  }

  // flash messages
  res.locals.flash = {
    info: req.flash('info'),
    error: req.flash('error'),
    warning: req.flash('warning'),
    success: req.flash('success'),
  };
  return next();
};
