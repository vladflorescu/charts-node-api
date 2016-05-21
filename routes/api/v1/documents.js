'use strict';

let express = require('express');
let router = express.Router();
let controller = require('../../../controllers/api/v1/documents');
let _ = require('lodash');
let multer = require('multer');

router.use(multer().single('file'));
router.post('/upload', controller.upload)
      .get('/descriptions', controller.descriptions);

module.exports = router;