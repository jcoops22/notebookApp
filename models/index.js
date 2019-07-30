

let mongoose = require('mongoose');
mongoose.set('debug', true);
// this (below) seems to initialize the database creation
mongoose.connect('mongodb://localhost/notes');

mongoose.Promise = Promise;

module.exports.note = require('./model.js');

