const Comment = require('../models/Comment');

exports.allComments = (req, res, next) => {
  Comment.find()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json(err))
};

exports.singleComment = (req, res, next) => {
  const { id } = req.params
  Comment.findOne({ _id: id })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json(err))
};

exports.commentsByUser = (req, res, next) => {
  const { id } = req.params
  Comment.find({ user: id })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json(err))
};

exports.commentsByCity = (req, res, next) => {
  Comment.find({ city: req.params.city })
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json(err))
};

exports.createComment = (req, res, next) => {
  const {
    title,
    comment,
    rating,
    user
  } = req.body

  const city = req.params.city

  if(!title || !comment || !rating) {
    return res.status(400).json({ message: 'Please, fill all the fields.' })
  };

  const newComment = new Comment ({
    title,
    comment,
    rating,
    city,
    user
  });

  newComment.save()
    .then((comment) => {
      res.status(200).json(comment)
    }) 
    .catch(err => res.status(500).json(err))
};

exports.editComment = (req, res, next) => {
  const { id } = req.params
  Comment.findByIdAndUpdate({ _id: id }, req.body, { new: true })
    .then(comment => {
      if(!comment) {
        return res.status(404).json({ message: "Not found "})
      }
      res.status(200).json(comment)
    }) 
    .catch(err => res.status(500).json(err))
};

exports.deleteComment = (req, res, next) => {
  const { id } = req.params
  Comment.findByIdAndDelete({ _id: id })
   .then(() => res.status(200).json({ message: `Your comment ${id} has been deleted successfully 🗑.` }))
   .catch(() => res.status(500).json({ message: 'Something went wrong. Please, try to delete your comment again.' }))
};