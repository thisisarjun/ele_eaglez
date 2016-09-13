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
		console.log('req parameters start');
		console.log(req.param('city'));
		console.log(req.param('area'));
		console.log('req parameters end');
		console.log('session parameters start');
		console.log(req.session.city);
		console.log(req.session.area);
		console.log('session parameters end');
		if( (typeof req.session.city == "undefined" && typeof req.session.area == 'undefined') || req.param('nwo') == 1 ) {
				req.session.city = req.param('city');
				req.session.area = req.param('area');
		}
		console.log('session parameters check 2 start');
		console.log(req.session.city);
		console.log(req.session.area);
		console.log('session parameters end');
		var cuisine;
		//cuisine selection, change between all or specific.
		if(req.param('cuisine').indexOf("~") >= 0) {
			cuisine = req.param('cuisine').split('~');
		}
		else {
			console.log('is else even working?');
			cuisine = req.param('cuisine');
		}
		//checking whether cuisine change is from ajax request/ index page / all cuisine option
		//convert to a sync parallel later.
		Cuisine.find({}, function(err, allcuisine){

					Hotel.find().where({'area':req.session.area,
						'cuisine' : cuisine,
						'city' : req.session.city
						}).exec(function (err,result){
						console.log('*****************');
						console.log('*****************');
						console.log('*****************');
						console.log(result);
						console.log('*****************');
						console.log('*****************');
						console.log('*****************');
						req.session.search = _.clone(result);
						req.session.allcuisine = _.clone(allcuisine);
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
