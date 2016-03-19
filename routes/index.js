var express = require('express');
var Post = require('../models/Post');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	Post.find(function(err, posts){
		if (err){
			posts = [];
		}
		res.render('index', { 
			title: 'Home Page',
			user: req.session.user,
			posts: posts,
			success: req.flash('success').toString(),
			error: req.flash('error').toString()
		});
	});

  	
});

module.exports = router;
