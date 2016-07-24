/*
	used to upload/download files.
*/
var promise = require('promise');
module.exports = {
	//basic upload using skipper, updloads and add the file descriptor to the record.
	/*
	skipper_obj -> req.file('field')
	id -> record id
	model -> corresponding model	
	*/
	'upload' : function(skipper_obj, id, model) {
				console.log('inside filefun upload');
						
				skipper_obj.upload({
					dirname : process.cwd()+'/assets/images/uploads/',
					maxBytes : 10000000				
				}, function(err,uploadedFile){
					//if no file uploaded.
					console.log('upload done');
					console.log(uploadedFile);
					if(uploadedFile[0].size == 0) {
						console.log('ok');
						req.session.flash = {
							'message' : 'no file was uploaded'
						};
						return;
					}
					//updating Hotel/User
					console.log('here');
					//console.log(uploadedFile[0].fd);
					//designed for windows s/m if for linux, change accordingly
					var fname = uploadedFile[0].fd.substring(uploadedFile[0].fd.lastIndexOf('\\') + 1);	
					model.update(id,{fd:fname})
					.exec(function(err){
						if(err) {
							req.session.flash = {
							'message':'problem with updation of database'
							};
							return;
						}
					});
					return;
				
			});
					
	}

};