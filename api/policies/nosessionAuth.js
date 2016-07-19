
/*
*
*	No Entry for Logged In Users.
*/

module.exports = function(req, res, next) {

  // User is allowed, proceed to the next policy, 
  // or if this is the last policy, the controller
  if (!req.session.authenticated) {
    return next();
  }
else {
		res.redirect('../../user/index');
	}
};