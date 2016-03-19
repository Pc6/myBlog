var express = require('express');
var crypto = require('crypto');
var User = require('../models/User');
var router = express.Router();

router.get('/', function(req, res){
	res.render('reg', {
		title: 'Register',
		user: req.session.user,
		success: req.flash('success').toString(),
		error: req.flash('error').toString()
	});
});

router.post('/', function(req, res){
	var name = req.body.name,
		password = req.body.password,
		password_re = req.body['password-repeat'];
	if (password_re != password){
		req.flash('error', 'The passwords are not the same');
		return res.redirect('/reg');
	}

	var md5 = crypto.createHash('md5'),
		password = md5.update(req.body.password).digest('hex');
	//console.log(User)
	var newUser = new User({
		name: name,
		password: password,
		email: req.body.email
	});
	User.findOne({name: newUser.name}, function(err, user){
		if (err){
			req.flash('error', err);
			return res.redirect('/');
		}
		if (user){
			req.flash('error', 'The user has existed');
			return res.redirect('/reg');
		}
		newUser.save(function(err, user){
			if (err){
				req.flash('error', err);
				return res.redirect('/reg');
			}
		});
		req.session.user = newUser;
		req.flash('success', 'Register successfully');
		//console.log('success')
		res.redirect('/');
	});

});

module.exports = router;