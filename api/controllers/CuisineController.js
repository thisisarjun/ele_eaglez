/**
 * CuisineController
 *
 * @description :: Server-side logic for managing cuisines
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create' : function(req, res, next) {
		//console.log(req.params.all());
		Cuisine.create(req.params.all(), function(err){
			if(err) {
				req.session.flash = {
					'message' : 'error in data loading'
				};
			}
			res.redirect('admin/createCu');
		});
	}
	
};

