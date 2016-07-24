/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions/basically login.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcryptjs = require('bcryptjs');
module.exports = {
	'new' : function(req, res, next) {		
		res.view('session/new');
	},

	//login verification happens in the below function.
	'create' : function(req, res, next) {
		 console.log('ok');
		//console.log(req.params.all());
		var i = 1;
		User.findOne({username:req.param('username')}, function(err,user){
			//console.log('veendum ok');

			//check 1 : whether username exists in the database or not.
			if(!user) {
				//console.log('ok error here');
				req.session.flash = {
					'message' : "the given username doesn't exist"
				};
				res.redirect('session/new');
				return;
			}

			console.log('ok user exist');
			bcryptjs.compare(req.param('password'),user.encpass, function(err, result) {
				if(result == false) {
					//console.log('incorrect password or username');
					req.session.flash = {
						'message' : "username or password is incorrect"
					};
					res.redirect('session/new');
					return;
				}
				if(result == true) {
					var redstring;
					if(user.username == 'ele_123neonet') {  //password : ele_baby
						req.session.admin = true;
						req.session.authenticated = true;
						req.session.uid = user.id;
						var redstring = 'admin/createH';
					}
					else {
						var redstring = 'user/index'
						req.session.authenticated = true;
						req.session.uid = user.id;
					}
					res.redirect(redstring);
				}

			});
				
		});
	}
};

