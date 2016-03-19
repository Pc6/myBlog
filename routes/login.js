var express = require('express');
var crypto = require('crypto');
var User = require('../models/User');
var router = express.Router();

router.get('/', function(req, res){
	res.render('login', {
		title: 'Login',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/', function(req, res){
	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	User.findOne({name: req.body.name}, function(err, user){
		if (!user){
			req.flash('err', 'User does not exist');
			return res.redirect('/login');
		}
		if (user.password != password){
			req.flash('error', 'The password is incorrect');
			return res.redirect('/login');
		}
		req.session.user = user;
		req.flash('success', 'Login successfully');
		res.redirect('/');
	});
});

module.exports = router;