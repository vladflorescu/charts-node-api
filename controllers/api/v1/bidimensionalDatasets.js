'use strict';

let mongoose = require('mongoose');
let Bidata = mongoose.model('Bidata');

exports.show = function(req, res) {
  Bidata.findById(req.params.id).exec((err, bidata) => {
    if (err) res.status(400).send(err);

    res.json({ id: bidata._id, title: bidata.title, values: bidata.values });
  });
};