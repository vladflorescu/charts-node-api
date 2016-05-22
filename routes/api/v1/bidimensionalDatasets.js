'use strict';

let express = require('express');
let router = express.Router();
let controller = require('../../../controllers/api/v1/bidimensionalDatasets');
let _ = require('lodash');

router.get('/:id', controller.show);

module.exports = router;