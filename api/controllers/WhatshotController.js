/**
 * WhatshotController
 *
 * @description :: Server-side logic for managing whatshots
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'index' : function(req, res, next) {
			City.find({}, function(err, cityres){
					if(req.session.authenticated) {
							console.log('session is authenticated');
							User.findOne({id:req.session.uid},function(err, result){
								//console.log('here in model method'+result);
								res.view({userobj:result,
													cityobj:cityres});
							});
						}
					else {
						res.view({userobj:null,
											cityobj:cityres});
					}
			});
	},
	'create' : function(req, res, next) {
				var citycomb = req.param('cityob').split('~');
				var cid = citycomb[0];
				var city = citycomb[1];
				var hotelcomb = req.param('hotelob').split('~');
				var hid = hotelcomb[0];
				var hname = hotelcomb[1];
				var menucomb = req.param('menuob').split('~');
				var mid = menucomb[0];
				var menu = menucomb[1];
				var that = this;
				that.counter = 0;
				Whatshot.find({'mid':mid},checkifexist);

				function checkifexist(err, result) {
					if(_.isEmpty(result)) {
						Whatcount.find({'cid':cid},  checkcount);
					}
					else {
						req.session.flash = {
							'message' : 'This item has already been added, please delete this item from Whatshot',
							'color' : 0
						};
						return res.redirect('/admin/createwhot');
					}

				}


				function checkcount(err, result) {
						that.counter = parseInt(result[0].counter);
						if(parseInt(that.counter) == 11) {
								console.log('maximum no. of items reached');
								req.session.flash = {
									'message' : 'Maximum Count Reached',
									'color' : 0
								};
								return res.redirect('/admin/createwhot');
						}
						else {
								Whatshot.create({
											'cid' : cid,
											'city' : city,
											'hid' : hid,
											'hname' : hname,
											'mid' : mid,
											'menu' : menu
										}, whatsuccess);
						}
				}
				function whatsuccess(error, result) {
						if(error) {
							req.session.flash = {
								'message' : 'DB error contact admin',
								'color' : 0
							};
							console.log(error);
							return res.redirect('/admin/createwhot');
						}
						else {
							that.counter+= 1;
							Whatcount.update({'cid':cid},{'counter':that.counter}, function(err, updated){
									req.session.flash = {
										'message' : 'The item has been successfully added',
										'color' : 1
									};
									return res.redirect('/admin/createwhot');
							});
						}
				}
	},

	'hoteldeci' : function(req, res, next) {
		var cobj = req.param('city').split('~');
		Hotel.find({city:cobj[0]}, function(err, result){
			res.send(JSON.stringify(result));
		});
	},

	'menudeci' : function(req, res, next) {
		var hobj = req.param('hid').split('~');
		Menu.find({hid:hobj[0]}, function(err, result){
				res.send(JSON.stringify(result));
		});
	},

	'getmenu' : function(req, res, next) {
		Whatshot.find({cid:req.param('id')}, function(err, result){
			var robj = JSON.stringify(result);
			res.send(robj);
		});
	}
};
