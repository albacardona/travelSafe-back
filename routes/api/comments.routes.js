const express = require('express');
const router = express.Router();

const Comment = require('../../models/Comment');
const User = require('../../models/User');

//! GET ALL COMMENTS ROUTE
router.get('/', (req, res, next) => {
  Comment.find()
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json(err))
});

//! GET SINGLE COMMENT BY COMMENT ID
router.get('/:id', (req, res, next) => {
  const { id } = req.params
  Comment.findOne({ _id: id })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json(err))
});

//! GET SINGLE COMMENTS BY USER ID
router.get('/user/:id', (req, res, next) => {
  const { id } = req.params
  Comment.find({ userID: id })
    .then(comment => res.status(200).json(comment))
    .catch(err => res.status(500).json(err))
});

//! GET CITY COMMENTS
router.get('/city/:city', (req, res, next) => {
  Comment.find({ city: req.params.city })
    .then(comments => res.status(200).json(comments))
    .catch(err => res.status(500).json(err))
});

//! POST CREATE COMMENT
router.post('/:city', (req, res, next) => {
  const {
    title,
    comment,
    rating,
    userID,
    name,
    lastName
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
    userID,
    name,
    lastName
  });

  newComment.save()
    .then((comment) => {
      res.status(200).json(comment)
      console.log(req.user)
    }) 
    .catch(err => res.status(500).json(err))
});

module.exports = router;