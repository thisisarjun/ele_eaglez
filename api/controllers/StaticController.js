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

	},
	'random' : function(req, res, next) {
		var string = "C:\\Users\\Arjun\Desktop\\ele_official\\.tmp\\uploads\\1993c754-4e83-4061-93ae-dc29c8c2d61b.jpg";
		var reg = string.split("\\");
		console.log(reg[reg.length-1]);


		res.view();
	}
};

