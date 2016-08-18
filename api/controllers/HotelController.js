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
		
		Hotel.find().where({'area':req.param('area'),
			'cuisine' : req.param('cuisine'),
			'city' : req.param('city')
			}).exec(function (err,result){
			req.session.search = _.clone(result);
			console.log(req.session.search);
			res.redirect('../../user/index');

		});
	}

}


