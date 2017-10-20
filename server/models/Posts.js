
module.exports = {
  // schema options
  // http://mongoosejs.com/docs/guide.html#options
  options: {
    timestamps: true
  },

  api: {
    enable: true,
    auth: true, // OR {get: false, post: true}
  },

  // schema fields
  // http://mongoosejs.com/docs/guide.html
  schema: {
    user: {
      type: Framework.mongoose.Schema.Types.ObjectId,
      model: 'User',
    },
    title: String,
    link: String,
    date: Date,
    publishedDate: Date,
    isPublished: Boolean,
    content: String,
    image: String,
    tags: String,
    symbol: String,
    shortDescription: String,
  }
};
