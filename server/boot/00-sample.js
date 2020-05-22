module.exports = function(callback){
  // https://docs.namedframework.com/boot/scripts.html 
  console.log('Server started at %s', new Date());
  // Do not forget to call callback()  
  return callback()
}