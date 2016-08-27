/**
 * HotelController
 *
 * @description :: Server-side logic for managing hotels
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'create' : function(req, res, next) {
		//console.log(req.params.all());
		Hotel.create(req.params.all(), function(err,user){
			//console.log(req.param('city'));
			if(err) {
				req.session.flash = {
					'message' : 'an error occured while loading data'
				};
				console.log(err);
				res.redirect('admin/createH');
				return;
			}
			req.session.hid = user.id;
			//console.log(req.session.hid);
			var field = req.file('fileup');
			//returns the promise object(value fd) from upload
			var path = 'Hotel/';
			filefun.upload(field, user.id,Hotel,path);
			res.redirect('admin/createH');


			});
	},
	'search' : function(req, res, next) {
		//only from static index or somewhere ?nwo=1,  the city and area can be set.
		var cuisine = {};
		if( (!req.session.city && !req.session.area) || req.param.nwo == 1 ) {
				req.session.city = req.param('city');
				req.session.area = req.param('area');
		}
		//cuisine selection, change between all or specific.
		if(req.param('cuisine') == 'all') {
				cuisine = {};
		}
		else {
			cuisine = req.param('cuisine');
		}
		//checking whether cuisine change is from ajax request/ index page / all cuisine option
		//convert to a sync parallel later.
		Cuisine.find({}, function(err, allcuisine){

					Hotel.find().where({'area':req.session.area,
						'cuisine' : cuisine,
						'city' : req.session.city
						}).exec(function (err,result){
						req.session.search = _.clone(result);
						req.session.allcuisine = _.clone(allcuisine);
						console.log(req.session.search);
						req.session.hocount = result.length;
						res.redirect('../../user/index');

					});
				});
	},

	/*
	*		following action is used for ajax search from user/index page.
	*/
	'indexsearch' : function(req, res, next) {
			console.log('ivde ethyee');
			var city = req.session.city;
			var area = req.session.area;
			var cuisine = req.param('cuisine').split(',');
			//console.log(req.param('cuisine'));
			Hotel.find({
				'area' : area,
				'city' : city,
				'cuisine' : cuisine
			}, function(err, result){
					if(err) {
						console.log(err);
					}
					res.send(result);
			});
	}

}
