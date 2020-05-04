// sample utils object
// Edit this and / or create new files 

module.exports = {
  toArray(str){
    if(_.isString(str)){
      return [str];
    }
    if(_.isArray(str)){
      return str;
    }
  },

  titleFromGender(gender = ''){
    switch (gender.toLowerCase() ) {
      case 'male':
        return 'Mr.';
      case 'female':
        return 'Ms.'
      default:
        return '';
    }
  },

}