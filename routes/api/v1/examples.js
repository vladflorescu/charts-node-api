'use strict';

var express = require('express');
var router = express.Router();
var controller = require('../../../controllers/api/v1/examples');
var _ = require('lodash');

// Sanitize request body
router.use(function(req, res, next) {
  if (req.body.example) {
    req.body = _.pick(req.body.example, ['name']);
  }
  next();
});

router.get('/', controller.index)
      .get('/:id', controller.show)
      .post('/', controller.create)
      .put('/:id', controller.update)
      .delete('/:id', controller.destroy);

module.exports = router;