const mongoose = require('mongoose');
const connection = require('../Connection').connection;
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  Title: { type: String, required: true },
  Description: { type: String, required: true },
  UserId: { type: Schema.Types.ObjectId, ref: 'User' },
  Status: { type: Number, required: true },
  Category: { type: String },
  created_at:  { type: Date, default: Date.now },
  updated_at:  { type: Date, default: Date.now },
});

blogSchema.pre('save', function(next) {
  this.updated_at = new Date();
  next();
});

class blogModel {

}

blogSchema.loadClass(blogModel);
const Blog = connection.model('Blog', blogSchema);

module.exports = Blog;
