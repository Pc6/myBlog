var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
	req.session.user = null;
	req.flash('success', 'Logout successfully');
	res.redirect('/');
});

module.exports = router;