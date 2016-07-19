/*
	this equips the res.locals.flash so that we can display errors.
*/
module.exports = function(req, res, next) {
	console.log('inside flash');
	console.log(req.session.flash);
	res.locals.flash = {};
	//meaning no error.
	if(!req.session.flash) { 
		console.log('session doesnt exist');
		return next(); }
	console.log('error message recieved in flash');
	res.locals.flash = _.clone(req.session.flash);
	req.session.flash = {};
	next();
}
