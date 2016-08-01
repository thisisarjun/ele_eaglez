/**
 * MenuController
 *
 * @description :: Server-side logic for managing menus
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'create': function(req, res, next) {
		//console.log(req.param('desc'));


		Menu.create(req.params.all(), function(err){
					if(err) {
								console.log(err);
								req.session.flash = {
									'message' : 'error in adding'
								};
							}
					res.redirect('admin/createM')
						
		});
	
	}

}

