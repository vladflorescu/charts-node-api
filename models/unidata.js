'use strict';

let mongoose = require('mongoose');

mongoose.model('Unidata', new mongoose.Schema({
  title: String,
  values: {}
}));