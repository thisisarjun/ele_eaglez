/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'index' : function(req, res, next) {
		//code later to be reinstated.
/*		Cuisine.find({},function(err, cuisine){
			res.view('static/index',{cuisine:cuisine});			
		});*/
		if(req.session.authenticated) {
			console.log('session is authenticated');
			User.findOne({id:req.session.uid},function(err, result){
				//console.log('here in model method'+result);
				res.view('static/index',{userobj:result});				
			});				
		}
		else {
			res.view('static/index',{userobj:null});
		}

	},
	'random' : function(req, res, next) {
		res.view();
	}
};

