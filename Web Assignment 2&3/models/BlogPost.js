const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  isDisabled: Boolean,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const blogPostSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    comment: String,
    author: String
  }],
  ratings: [{
    value: Number,
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);
module.exports = BlogPost;