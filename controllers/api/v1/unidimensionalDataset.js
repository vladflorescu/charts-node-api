'use strict';

let mongoose = require('mongoose');
let Unidata = mongoose.model('Unidata');

exports.show = function(req, res) {
  Unidata.findById(req.params.id).then((err, unidata) => {
    if (err) res.status(400).send(err);
    res.json({ id: unidata._id, title: unidata.title, values: unidata.values });
  });
};