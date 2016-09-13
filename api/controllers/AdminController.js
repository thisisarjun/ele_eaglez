/**
 * AdminController
 *
 * @description :: Server-side logic for managing admins
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//	var Promise = require('promise');
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
	'createwhot' : function(req, res, next) {
		City.find({}, function(err, cires){
			User.findOne(req.session.uid, function(err, admin){
				res.view('admin/createwhot',{layout:'layouts/admin',
											adminobj:admin,
											cityobj:cires});
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
	},

	'viewa' : function(req, res, next) {
		User.findOne(req.session.uid, function(err, admin){
			Area.find({}, function(err, area){
				City.clist(area, function(cityname){
				return res.view('admin/viewa',{layout:'layouts/admin',
													areaobj : area,
													adminobj:admin,
													cityname : cityname});

				});
			});
		});

	},

	'viewc' : function(req, res, next) {
		City.find({}, function(err, city){
			User.findOne(req.session.uid, function(err, admin){
				res.view('admin/viewc',{layout:'layouts/admin',
											cityobj : city,
											adminobj:admin});
			});
		});
	},

	'viewcu' : function(req, res, next) {
		Cuisine.find({}, function(err, cuisine){
			User.findOne(req.session.uid, function(err, admin){
				res.view('admin/viewcu',{layout:'layouts/admin',
											cuobj : cuisine,
											adminobj:admin});
			});
		});
	},

	'viewre' : function(req, res, next) {
		Hotel.find({}, function(err, hotel){
			User.findOne(req.session.uid, function(err, admin){
				res.view('admin/viewre',{layout:'layouts/admin',
											hobj : hotel,
											adminobj:admin});
			});
		});
	}


};
