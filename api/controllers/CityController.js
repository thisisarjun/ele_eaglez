/**
 * CityController
 *
 * @description :: Server-side logic for managing cities
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create' : function(req, res, next) {
			var name = req.param('name').toString().trim();
			var nameconfi = req.param('nameconfi').toString().trim();
			if( name == nameconfi ) {
				City.create({name:name}, function(err, result){
					if(err) {
						req.session.flash = {
							'message' : 'error in data loading, possible dupicate entry',
							'color' : 0
						};
						res.redirect('admin/createc');
						return;
					}
					else {
						Whatcount.create({cid:result.id,
															counter:1}, function(err){
																if(err) {
																	console.log(err);
																}
													});
						req.session.flash = {
							'message' : 'successfully added',
							'color' : 1
						};
						res.redirect('admin/createc');
						return;
					}

				});
			}
			else {
				req.session.flash = {
					'message' : 'sorry both the fields do not match',
					color : 0
				};
				res.redirect('admin/createc');
				return;
			}

		},
		/*
			destroy function of city and areas under the city
		*/
	'destroy' : function(req, res, next) {
				var cid = req.param('id');
				Area.destroy({cid:cid}, function(err){
					if(err) {
						return console.log(err);
					}
					City.destroy({id:cid}, function(err){
						if(err) {
							return console.log(err);
						}
						Whatcount.destroy({'cid':cid}, function(err){
								if(err) {
									return console.log(err);
								}
								Hotel.destroy({'city':cid}, function(err){
									if(err) {
										return console.log(err);
									}
									res.redirect('/admin/viewc');
								});

						});
					});
				});

		}

};
