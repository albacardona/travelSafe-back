const router = require('express').Router();

router.use('/auth', require('./auth.routes'));
router.use('/comments', require('./comments.routes'));

module.exports = router;