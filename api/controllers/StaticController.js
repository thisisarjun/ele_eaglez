/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'index' : function(req, res, next) {
		City.find({}, function(err, city){
			Cuisine.find({},function(err, cuisine){		
				if(req.session.authenticated) {
					console.log('session is authenticated');
					User.findOne({id:req.session.uid},function(err, result){
						//console.log('here in model method'+result);
						res.view('static/index',{userobj:result,
												cuisobj:cuisine,
												cityobj:city});				
					});				
				}
				else {
					res.view('static/index',{userobj:null,
											cuisobj:cuisine,
											cityobj:city});
				}
			});
		});
	}
};

