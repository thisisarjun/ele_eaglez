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
			Cuisine.find({}, function(err, cuisobj){
				City.find({}, function(err, cityobj){ 
					res.view('admin/createH',{layout:'layouts/admin',
												adminobj:admin,
												cuisobj:cuisobj,
												cityobj:cityobj});
				});
			});			
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
		User.findOne(req.session.uid, function(err, admin){
			res.view('admin/createCu',{layout:'layouts/admin',
										adminobj:admin});
		});
	},

	'createc' : function(req, res, next) {
		User.findOne(req.session.uid, function(err, admin){
			res.view('admin/createc',{layout:'layouts/admin',
										adminobj:admin});
		});
	},

	'createa' : function(req, res, next) {
		City.find({}, function(err, result) {
			User.findOne(req.session.uid, function(err, admin){
				res.view('admin/createa',{layout:'layouts/admin',
											adminobj:admin,
											cityobj:result});
			});
		});
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

