// example middleware  
module.exports = function (req, res, next) {
  
  // url locals 
  res.locals.url = req.originalUrl;

  return next();
};
