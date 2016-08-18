/**
 * City.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	'name': {
  		type:'string',
  		required : true,
  		unique : true
  	}
  },
/*
	the below function is used for view areas, to get the list of cities under which it comes, in index wise order.
*/
  clist : function(aobj, callback) {
  		var cityname = new Array();
		aobj.forEach(function(currv, index) {
			City.find({id:currv.cid}, function(err, city){
				if(err) {
					console.log(err);
				}
				cityname[index] = city[0].name;
				if(cityname.length == aobj.length) {
					return callback(cityname);
				}
			});
		});
	}
 
};
