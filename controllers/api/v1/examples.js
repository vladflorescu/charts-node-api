'use strict';

let mongoose = require('mongoose');
let Example = mongoose.model('Example');

exports.index = function(req, res) {
  Example.find().exec((err, examples) => {
    if (err) res.status(400).send(err);

    res.json({ examples: examples });
  })
};

exports.show = function(req, res) {
  Example.findById(req.params.id).then((err, example) => {
    if (err) res.status(400).send(err);

    res.json(example);
  })
};

exports.create = function(req, res) {
  let example = new Example(req.body);

  // save is not returning promise
  example.save((err, example) => {
    if (err) res.status(400).send(err);

    res.json(example);
  });
};

exports.update = function(req, res) {
  Example.findOneAndUpdate({ _id: req.params.id }, req.body, (err, example) => {
    if (err) res.status(400).send(err);

    res.json(example);
  });
};

exports.destroy = function(req, res) {
  Example.findOneAndRemove({ _id: req.params.id }, (err, example) => {
    if (err) res.status(400).send(err);

    res.status(200).send();
  });
};