/*
	object functions to help development
*/
module.exports = {

	'getCount' : function(obj, prop, compstr, callback) {
		var length = obj.length;
		var indarr = [];
		console.log('length is '+ length);

		var count = 0;
		for(var i =0; i<obj.length; i++) {
			console.log('obj[prop] is '+ obj[i][prop]);
			if(obj[i][prop] == compstr) {
				indarr[count] = i;
				count += 1;

			}

		}
		callback(count, indarr);
	}

}
