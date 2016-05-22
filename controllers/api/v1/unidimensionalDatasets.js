'use strict';

let mongoose = require('mongoose');
let Unidata = mongoose.model('Unidata');

exports.show = function(req, res) {
  Unidata.findById(req.params.id).exec((err, unidata) => {
    if (err) res.status(400).send(err);
    res.json({ unidimensionalDataset: unidata });
  });
};

exports.destroy = function(req, res) {
  Unidata.findOneAndRemove({ _id: req.params.id }, (err, example) => {
    if (err) res.status(400).send(err);

    res.status(200).send();
  });
};