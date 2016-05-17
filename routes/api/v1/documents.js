'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../../../controllers/api/v1/documents');
var _ = require('lodash');

router.post('/upload', controller.upload);

module.exports = router;