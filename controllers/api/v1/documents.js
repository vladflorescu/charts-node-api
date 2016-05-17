'use strict';

let mongoose = require('mongoose');
let Document = mongoose.model('Document');

exports.upload = function(req, res) {
  console.log("asta e aici", req);
  Document.find().exec((err, documents) => {
    if (err) res.status(400).send(err);

    res.json({ documents: documents });
  })
};