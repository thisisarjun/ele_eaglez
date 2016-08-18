/**
 * Hotel.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 detail containing hotels.
 Id |	Hname |	Howner |	Address |	City | Area | State |	Country |	Pin |	phone |	status | fd  | fname
 */

module.exports = {
	schema : true,
  attributes: {
  	'hname' : {
  		type : 'string',
  		required : true
  	},
  	'howner' : {
  		type : 'string',
  		required : true
  	},
    'cuisine' : {
      type : 'string',
      required : true
    },
  	'address' : {
  		type : 'string',
  		required : true
  	},
    'city' : {
      type : 'string',
      required : true
    },
    'area' : {
      type : 'string',
      required : true
    },
  	'state' : {
  		type : 'string',
      defaultsTo : 'Kerala'
  	},
  	'country' : {
  		type : 'string'
  	},
  	'pin' : {
  		type : 'integer',
  	},
  	'phone' : {
  		type : 'integer'
  	},
  	'status' : {
  		type : 'string',
    	enum : ['open','closed','defunct']
  	},
  	'fd' : {
  		type : 'string'
  	}


  }



  }



