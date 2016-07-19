/**
 * StaticController
 *
 * @description :: Server-side logic for managing statics
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	'index' : function(req, res, next) {
		Cuisine.find({},function(err, cuisine){
			res.view('static/index',{cuisine:cuisine});			
		});

	}
};

