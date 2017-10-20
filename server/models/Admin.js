module.exports = {
  api: false,
  
  schema: {
    name: {
      type: "String",
      required: true
    },
    username: {
      type:"String",
      unique: true,
      required: true
    },
    password: {
      type: "String",
      required: true
    },
    securityHash: {
      type: "String"
    },
    isActive: {
      type: Boolean,
      default: true
    }
  },
  options: {
    strict: true
  }

};
