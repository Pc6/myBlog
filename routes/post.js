var express = require('express');
var Post = require('../models/Post');
var router = express.Router();

router.get('/', function(req, res){
	res.render('post', {
		title: 'post',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/', function(req, res){
	var currentUser = req.session.user,
		post = new Post({
			name: currentUser.name,
			title: req.body.title,
			post: req.body.post
		});
	post.save(function(err, post){
		if (err){
			req.flash('error', err);
			return res.redirect('/');
		}
		req.flash('success', 'Post Successfully');
		res.redirect('/');
	});
});

module.exports = router;