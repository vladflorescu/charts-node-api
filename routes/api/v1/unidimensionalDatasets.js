'use strict';

let express = require('express');
let router = express.Router();
let controller = require('../../../controllers/api/v1/unidimensionalDatasets');
let _ = require('lodash');

router.get('/:id', controller.show)
      .delete('/:id', controller.destroy);

module.exports = router;