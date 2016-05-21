'use strict';

let mongoose = require('mongoose');

mongoose.model('Bidata', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  values: {}
}));