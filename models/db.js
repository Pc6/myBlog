var mongoose = require('mongoose');

module.exports.connect= function connect(){
	mongoose.connect('mongodb://localhost/blog');
	var db = mongoose.connection;
	db.on('error', console.error.bind(console, 'connection error: '));
};