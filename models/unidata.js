'use strict';

let mongoose = require('mongoose');

mongoose.model('Unidata', new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  values: {}
}));