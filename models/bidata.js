'use strict';

let mongoose = require('mongoose');

mongoose.model('Bidata', new mongoose.Schema({
  title: String,
  values: {}
}));