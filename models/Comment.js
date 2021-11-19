const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  title: {type: String, required: true},
  comment: {type: String, required: true},
  rating: {type: Number, required: true},
  city: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'User'},
  date: {type: Date, default: Date.now()}
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      return ret;
    }
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment