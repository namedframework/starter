module.exports = function () {
    for (i=0; i<arguments.length; i++){
      if(arguments[i] == '' || arguments[i] == undefined || arguments[i] == null ){
        return true;
      }
    }
    return false;
};
