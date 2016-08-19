/**
 * AreaController
 *
 * @description :: Server-side logic for managing areas
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create' : function(req, res, next) {
			var name = req.param('name').toString().trim();
			var nameconfi = req.param('nameconfi').toString().trim();
			if( name == nameconfi ) {
				var crobj = {
					name : name,
					cid : req.param('cid')
				}
				Area.create(crobj, function(err){
					if(err) {
						req.session.flash = {
							'message' : 'error in data loading, possible dupicate entry',
							'color' : 0
						};
						res.redirect('admin/createa');
						return;
					}
					else {
						console.log('ok successfully');
						req.session.flash = {
							'message' : 'successfully added',
							'color' : 1
						};
						console.log('before leaving');
						console.log(req.session.flash);
						res.redirect('admin/createa');
						return;
					}

				});
			}
			else {
				req.session.flash = {
					'message' : 'sorry both the fields do not match',
					color : 0
				};
				res.redirect('admin/createa');
				return;
			}

		},
/*
	below function is used in the 'subsequent drop down list of cities and areas.'
*/
	'deci' : function(req, res, next) {
		//console.log(req.params.all());
		Area.find({cid:req.param('id')}, function(err, result){
			if(err) {
				console.log(err);
			}
			res.send(result);
		});
	},

	// delete area record.
	'destroy' : function(req, res, next) {
		var ida = req.param('id');
		Area.destroy({id:ida}, function(err){
			if(err) {
				console.log(err);
			}
			res.redirect('/admin/viewa');
		});
	}
};
