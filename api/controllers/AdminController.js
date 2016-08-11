/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	//add hotel details
	'createH' : function(req, res, next) {
		User.findOne(req.session.uid, function(err, admin){
			res.view('admin/createH',{layout:'layouts/admin',
										adminobj:admin});			
		});
	},
	
	'createM' : function(req, res, next) {
		User.findOne(req.session.uid, function(err, admin){
			Hotel.find({},function(err, hotel){
				//console.log(hotel);
				res.view('admin/createM',{layout:'layouts/admin',
											hotel:hotel,
											adminobj : admin
														});
			});
		});
		
	},

	'createCu' : function(req, res, next) {
		res.view('admin/createCu',{layout:'layouts/admin'});
	},

	'viewH' : function(req, res, next) {
		console.log('here in viewH');
		Hotel.find({}, function(err,hotel){
			User.findOne({id:req.session.uid}, function(err, user){
				res.view({layout:'layouts/admin',
										hotelobj:hotel,
										adminobj:user});
			});
			
		}); 

	},
	'viewHc' : function(req, res, next) {
		res.view();
	},

	'ViewU' : function(req, res, next) {
		User.find({}, function(err, user){
			User.findOne(req.session.uid, function(err, admin){
				res.view('admin/ViewU',{layout:'layouts/admin',
											userobj : user,
											adminobj:admin});			
			});	
		});
	}
	
};

