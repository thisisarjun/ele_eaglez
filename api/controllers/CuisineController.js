/**
 * CuisineController
 *
 * @description :: Server-side logic for managing cuisines
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create' : function(req, res, next) {
		var name = req.param('name').toString().trim();
		var nameconfi = req.param('nameconfi').toString().trim();
		if( name == nameconfi ) {
			Cuisine.create({name:name}, function(err){
				if(err) {
					req.session.flash = {
						'message' : 'error in data loading, possible dupicate entry',
						'color' : 0
					};
					res.redirect('admin/createCu');
					return;
				}
				else {
					console.log('ok successfully');
					req.session.flash = {
						'message' : 'successfully added',
						'color' : 1
					};
					console.log('before leaving');
					console.log(req.session.flash);
					res.redirect('admin/createCu');
					return;
				}

			});
		}
		else {
			req.session.flash = {
				'message' : 'sorry both the fields do not match',
				color : 0
			};
			res.redirect('admin/createCu');
			return;
		}

	},

//delete cuisine
'destroy' : function(req, res, next) {
			var id = req.param('id');
				Cuisine.destroy({id:id}, function(err){
					if(err) {
						return console.log(err);
					}
					res.redirect('/admin/viewcu');
				});

	}
};
