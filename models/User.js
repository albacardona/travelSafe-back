const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  name: {type: String, required: true},
  lastName: {type: String, required: true},
  password: {type: String, required: true, minlength: 6},
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i, 'Please fill a valid email format.']
  },
  city: {type: String, required: true},
  wishVisit: {type: [String], default: []},
  alreadyVisited: {type: [String], default: []},
  comments: {type: [String], default: []}
}, 
{
  timestamps: true,
  toJSON: {
    transform: (doc, ret) => {
      ret.id = doc._id;
      delete ret._id;
      delete ret.__v;
      delete ret.createdAt;
      delete ret.password;
      return ret;
    }
  }
})

const User = mongoose.model('User', userSchema)

module.exports = User