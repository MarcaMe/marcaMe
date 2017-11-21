const router = require('express').Router();

router.use('/videoScraping', require('./videoScraping'));
router.use('/articleScraping', require('./articleScraping'));

module.exports = router;
