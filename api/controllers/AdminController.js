/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//add hotel details
	'createH' : function(req, res, next) {
		res.view('admin/createH',{layout:'layouts/admin'});
	},
	
	'createM' : function(req, res, next) {
		
		Hotel.find({},function(err, hotel){
			//console.log(hotel);
			res.view('admin/createM',{layout:'layouts/admin',
										hotel:hotel});
		});
		
	},

	'createCu' : function(req, res, next) {
		res.view('admin/createCu',{layout:'layouts/admin'});
	}
	
};

