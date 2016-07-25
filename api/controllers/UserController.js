/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'index' : function(req, res, next) {
		if(req.session.authenticated) {
			console.log(req.session.uid);
			//console.log('here in index'+req.session.id);
			User.findOne({id:req.session.uid},function(err, result){
				//console.log('here in model method'+result);
				res.view('user/index',{obj:req.session.search,
										userobj:result});				
			});				
		}
		else {
			res.view('user/index',{obj:req.session.search,
									userobj:{}});
		}
	},

	'new' : function(req,res,next){
		res.view();
	},

	'create' : function(req,res,next) {
		//console.log(req.params.all());
		
		var password = req.param('password');
		var prom = User.gethash(password);
		prom.then(function(encpass){
			req.params.encpass = encpass;
			//creating.
			User.create(req.params.all(),function(err, user){
				if(err) { console.log(err); }
				else { res.redirect('session/new'); }

			});
		});
	

	},
	'show' : function(req, res , next) {
		User.findOne(req.param('id'), function(err, user){
			res.view({
				user : user
			});
		});
	},

	'edit' : function(req, res, next) {

		if(req.param('submit')) {
			//comparing old password with the entered old password.
			var enhashpass = 
/*		User.update({name:req.param('name'),
							})*/
			User.findOne({id:req.session.uid},function(err, result){
					res.view('user/edit',{userobj:result});				
			});

		}
			
		
	},
	'destroy' : function(req, res, next) {
		req.session.destroy();
		res.redirect('static/index');
	},

	//temporary
	'test' : function(req, res, next) {
		console.log(req.param('submit'));
			res.view();
	}
};

