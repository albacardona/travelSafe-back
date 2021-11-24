const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({
  title: {type: String, required: true},
  comment: {type: String, required: true},
  rating: {type: Number, required: true},
  city: {type: String},
  user: {type: Schema.Types.ObjectId, ref: 'User'}
}, {
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      return ret;
    }
  }
})

const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment