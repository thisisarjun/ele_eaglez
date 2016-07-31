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

		var password = req.param('password');
		User.getHash(password, function(err,encpass){
			if(err)
				return console.log(err);
			req.params.encpass = encpass;
			//creating.
			User.create(req.params.all(),function(err, user){
				if(err) { console.log(err); }
				else { 
					req.session.uid = user.id;
					var skipobj = req.file('fileup');
					var path = 'avatar/';
					filefun.upload(skipobj, user.id, User, path );
					res.redirect('session/new'); 
				}
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
			User.findOne({id:req.session.uid},function(err, result){
					res.view('user/edit',{userobj:result});				


		});
			
		
	},

	'updatea' : function(req, res, next) {
		//step 1 : if avatar is submitted execute below code.
		//step 2: if details need to be updated, then the next one is submitted.
			/*
				file upload and delete
			*/
			if(req.param('uploads') == 'uploads' && req.method.toLowerCase() == 'post' ) {
				console.log('inside upfile');
				var pat = 'avatar/';
				var skipobj = req.file('fileup');
				filefun.delete(User,req.session.uid,pat,function(err){
					if(err) {
						req.session.flash = {
							'message' : 'there seem to be a problem in uploading the file. please try again'
						};
						return;
					}
				filefun.upload(skipobj, req.session.uid, User, pat);
				});
				res.redirect('user/edit');
			}
			/*
				update the details 
			*/	
	},

	'updated' : function(req, res, next) {
		User.getHash(req.param('oldpassword'), function(err, hashe){
			if(err) {
				req.session.flash = {
					'message' : 'problem in hashing'
				};
				console.log('error in hashing');
				return next();
			} 
			User.compareAtt(req.session.uid, 'encpass', hashe, function(err, result){
				if(err) {
					req.session.flash = {
						'message' : 'problem in comparison method'
					};
					console.log('error in comparison');
					return next();					
				}
				if(result == false) {
					req.session.flash = {
						'message' : 'your entered password doesnt match with current password'
					};
					console.log('false in comparison');
					return next();					
				}
				User.getHash(req.param('password'),function(err, hashe){
					if(err) {
						req.session.flash = {
							'message' : 'problem in hashing'
						};
						console.log('error in hashing');
						return next();						
					}
					var upob = {
						name : req.param('name'),
						address : req.param('password'),
						state : req.param('state'),
						country : req.param('country'),
						password : hashe
					};
					User.update({id:req.session.uid},upob, function(err, updated){
						if(err) {
							req.session.flash = {
								'message' : 'problem in updation'
							};
							console.log(err);
							return next();
						}
						console.log('successfully updated yo');
					});					
				});

			});

		});
		
	},

	'destroy' : function(req, res, next) {
		req.session.destroy();
		res.redirect('static/index');
	},

	'temp' : function(req, res, next) {
		console.log(req.params.all());
/*		req.file('fileup').upload({ maxBytes : 100000},
			function(err, uploadedFiles){
				console.log(uploadedFiles[0]);
			});*/
		res.view();
	}
};

