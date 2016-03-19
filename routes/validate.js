module.exports.checkLogin = function(req, res, next){
	if (!req.session.user){
		req.flash('error', 'You need to login');
		return res.redirect('/login');
	}
	next();
}

module.exports.checkNotLogin = function(req, res, next){
	if (req.session.user){
		req.flash('error', 'You have logged in');
		return res.redirect('back');
	}
	next();
}