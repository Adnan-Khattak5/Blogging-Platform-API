const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const notificationSchema = new mongoose.Schema({
    message: String,
    recipient: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });

const Notification = mongoose.model('Notification', notificationSchema);

module.exports = Notification;
