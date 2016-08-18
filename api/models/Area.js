/**
 * Area.js

id	| cid	|	name
note: cid is city's id under which the area belongs
 */

module.exports = {

  attributes: {
  	'cid': {
  		type : 'string',
  		required:true
  	},
  	'name' : {
  		type : 'string',
  		required:true
  	}
  }
};

