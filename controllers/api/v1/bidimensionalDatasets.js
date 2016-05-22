'use strict';

let mongoose = require('mongoose');
let Bidata = mongoose.model('Bidata');

exports.show = function(req, res) {
  Bidata.findById(req.params.id).exec((err, bidata) => {
    if (err) res.status(400).send(err);

    res.json({ bidimensionalDataset: bidata });
  });
};

exports.destroy = function(req, res) {
  Bidata.findOneAndRemove({ _id: req.params.id }, (err, example) => {
    if (err) res.status(400).send(err);

    res.status(200).send();
  });
};