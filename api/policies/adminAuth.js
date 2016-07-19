module.exports = function(req, res, next) {
	if(req.session.authenticated) {
		if(req.session.admin) {
			return next();
		}
		else {
			res.redirect('../../session/new');
		}
	}
	else
		res.redirect('../../session/new');
}