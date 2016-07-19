/**
 * Menu.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 	Id	| Hid |	Ftype |	fname |	desc
 */

module.exports = {

  attributes: {
  	'hid' : {
  		type : 'string',
  		required : true
  	},
  	'ftype' : {
  		type : 'string',
  		defaultsTo : ['s','m','d'],
  		required : true
  	},
  	'fname' : {
  		type : 'string',
  		required : true
  	},
  	'desc' : {
  		type : 'string',
  		required : true
  	},
    'price' : {
      type : 'float',
      required : true
    }
  }
};

