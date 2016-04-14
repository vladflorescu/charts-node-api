'use strict';

let mongoose = require('mongoose');

mongoose.model('Example', new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Name can\'t be blank'
  }
}));