const router = require('express').Router();

router.use('/user', require('./user.routes'));
router.use('/comments', require('./comments.routes'));

module.exports = router;