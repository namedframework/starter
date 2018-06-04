module.exports = {
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
    isSuperAdmin: {
      type: Boolean,
      default: false
    },
    contact: {
      type: "String",
    },
    remarks: {
      type: "String",
    },
  },
  options: {
    strict: true
  }

};
