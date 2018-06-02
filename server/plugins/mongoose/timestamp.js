module.exports = function (schema, options) {
  schema.add({ createdAt: Date });
  schema.add({ updatedAt: Date });

  schema.pre('update', function() {
    this.update({},{ $set: { updatedAt: new Date() } });
  });

  schema.pre('findOneAndUpdate', function() {
    this.update({},{ $set: { updatedAt: new Date() } });
  });

  schema.pre('save', function (next) {
    if (this.isNew) {
      this.createdAt = new Date();
    }
    this.updatedAt = new Date();

    next();
  });

};
