const router = require('express').Router();

router.use('/vedioScraping', require('./vedioScraping'));
router.use('/articleScraping', require('./articleScraping'));