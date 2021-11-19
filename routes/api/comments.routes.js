const express = require('express');
const router = express.Router();

const CommentsController = require('../../controllers/comments')

//* GET ALL COMMENTS ROUTE
router.get('/', CommentsController.allComments);

//* GET SINGLE COMMENT BY COMMENT ID
router.get('/:id', CommentsController.singleComment);

//* GET ALL COMMENTS BY USER ID
router.get('/user/:id', CommentsController.commentsByUser);

//* GET CITY COMMENTS
router.get('/city/:city', CommentsController.commentsByCity);

//* POST CREATE COMMENT
router.post('/:city', CommentsController.createComment);

//* PUT ROUTE UPDATE COMMENT
router.put('/:id', CommentsController.editComment );

//* DELETE COMMENT ROUTE
router.delete('/:id', CommentsController.deleteComment);

module.exports = router;