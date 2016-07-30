/**
 * User.js
 *
 Columns : 
name | username | email | encpass | address | state | country | pin | phone | status | admin | fd
Function List : 


 */
 
 var bcryptjs = require('bcryptjs');

module.exports = {

	schema : true,
  attributes: {
  	name : {
  		type : 'string',
  		required : true
  	},
  	username : {
  		type : 'string',
  		required : true
  	},
  	email : {
  		type : 'string',
  		email : true,
  		required : true
  	},
  	encpass : {
  		type : 'string',
  		required : true
  	},
  	address : {
  		type : 'string',
  		required : true
  	},
  	state : {
  		type : 'string',
  		required : true
  	},
  	country : {
  		type : 'string',
  		defaultsTo : 'U.A.E'
  	},
  	pin : {
  		type : 'integer',
  		required : true
  	},
  	phone : {
  		type : 'integer',
  		required : true
  	},
  	status : {
  		type :'boolean',
  		defaultsTo : true
  	},
    admin : {
      type : 'boolean',
      defaultsTo : false
    },
    fd : {
      type: 'string'
    }

  },
  //the following function gives the hashed value of the password.
/*  gethash : function(password) {
  	return new promise(function(resolve,reject){
  		bcryptjs.genSalt(10, function(err,salt){
  			//hashe is the result, i.e hashed value.
  			bcryptjs.hash(password,salt,function(err,hashe){
  				if(hashe) { resolve(hashe); }
  			});
  		});
  	});
  }*/

  getHash : function(password,callback) {

    bcryptjs.genSalt(10, function(err, salt){
      bcryptjs.hash(password, salt, function(err, hashe){
        if(err) {
          return callback(err);
        }
        else
          callback(null,hashe);
      });
    });
  }

  
};

