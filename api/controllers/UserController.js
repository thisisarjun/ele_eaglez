/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcryptjs = require('bcryptjs');
module.exports = {
	'index' : function(req, res, next) {
		if(req.session.authenticated) {
			console.log('session is authenticated');
			User.findOne({id:req.session.uid},function(err, result){
				//console.log('here in model method'+result);
				res.view('user/index',{obj:req.session.search,
										userobj:result});				
			});				
		}
		else {
			res.view('user/index',{obj:req.session.search,
									userobj:null});
		}
	},

	'new' : function(req,res,next){
		res.view();
	},

	'create' : function(req,res,next) {

	
		User.findOne({username:req.param('username')}, function(err, result){
			var redstring;
			console.log(result);
			if(result) {
				console.log('here in first if');
				req.session.flash = {
					'message' : 'please try a different username, this one seems to be taken.'
				};
				req.session.flash.color = 0;
				redstring = 'user/new';	
				
			}
			else {
				console.log('here in else')	;
				var password = req.param('password');
				redstring = 'session/new';
				User.getHash(password, function(err,encpass){
					if(err)
						return console.log(err);
					req.params.encpass = encpass;
					console.log(encpass);
						//creating.
						User.create(req.params.all(),function(err, user){
							if(err) { //not gonna happen as there is front side validation
								console.log(JSON.stringify(err,null,2)); }
							else { 
								console.log(user.id);
								req.session.uid = user.id;
								req.session.flash = {
									'message' : 'successfully registered. please login to continue'
								};
								req.session.flash.color = 1;
							}
						});
				 });
			}
			res.redirect(redstring);		
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
			User.findOne({id:req.session.uid},function(err, result){
					res.view('user/edit',{userobj:result});				


		});
			
		
	},


	//update details

	'updated' : function(req, res, next) {
		var redstring;
		User.findOne({id:req.session.uid}, function(err, user) {
			if(err) {
				req.session.flash = {
					'message' : 'critical error please contact Administrator'
				};
				 redstring = '../user/edit';
			}
			bcryptjs.compare(req.param('oldpassword'), user.encpass, function(err, result){
				if(result == false) {
					req.session.flash = {
						'message' : 'your password doesnt match your current password'
					};
					console.log('error in comparison');
					 redstring = '../user/edit';				
				}
				
				User.getHash(req.param('password'),function(err, hashe){
					if(err) {
						req.session.flash = {
							'message' : 'problem in hashing'
						};
						console.log('error in hashing');
						 redstring = '../user/edit';						
					}
					var upob = {
						name : req.param('name'),
						address : req.param('password'),
						state : req.param('state'),
						country : req.param('country'),
						encpass : hashe
					};
					User.update({id:req.session.uid},upob, function(err, updated){
						if(err) {
							req.session.flash = {
								'message' : 'problem in updation'
							};
							console.log(err);
							 redstring = '../user/edit';s
						}
						console.log('successfully updated yo');
						res.redirect(redstring);
					});					
				});

			});

		});
		
	},

	'destroy' : function(req, res, next) {
		req.session.destroy();
		res.redirect('static/index');
	},
	'menuv' : function(req, res, next) {
		Menu.find({hid:req.param('id')}, function(err, result){
			console.log(result);
			var sc,scarr,mc,mcarr,dc,dcarr;
			if(err) {
				console.log('query error:'+ err);
			}

	
			objhelper.getCount(result, 'ftype', 's', function(scount, sind){
				sc = scount;
				sarr = sind;
			});	
			objhelper.getCount(result, 'ftype', 'm', function(mcount, mind){
				mc = mcount;
				marr = mind;
			});
			objhelper.getCount(result, 'ftype', 'd', function(dcount,dind){
				dc = dcount;
				darr = dind;
			});	
			console.log('scount is ' + sc);	
			console.log('sarr is ' + sarr);
			console.log('mcount is ' + mc);
			console.log('marr is ' + marr);
			console.log('dcount is ' + dc);
			console.log('darr is ' + darr);
			res.view({menuobj:result,
					sc:sc,
					sarr:sarr,
					mc:mc,
					marr:marr,
					dc:dc,
					darr:darr });
		});
		
	}


};

