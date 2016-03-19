var mongoose = require('mongoose');

var postSchema = new mongoose.Schema({
	name: String,
	title: String,
	post: String,
	time: {type: Date, default: Date.now}
});

var Post = mongoose.model('post', postSchema);

module.exports = Post;