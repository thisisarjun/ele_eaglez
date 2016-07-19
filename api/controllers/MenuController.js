/**
 * MenuController
 *
 * @description :: Server-side logic for managing menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'create': function(req, res, next) {
		//console.log(req.param('desc'));

		var menuobj = {
			'fname' : req.param('fname'),
			'ftype' : req.param('ftype'),
			'desc' : req.param('desc'),
			'hid' : req.param('hid')
		};
		console.log(menuobj);

		Menu.create(menuobj, function(err){
					if(err) {
								console.log(err);
								req.session.flash = {
									'message' : 'error in adding'
								};
							}
						
		});
	
	}

}

