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
					maxBytes : 10000000,
				}, function(err,uploadedFile){
					//if no file uploaded.
					console.log('upload done');
					console.log(uploadedFile);
					if(uploadedFile.size == 0) {
						console.log('ok');
						req.session.flash = {
							'message' : 'no file was uploaded'
						};
						return;
					}
					//updating Hotel/User
					console.log('here');
					console.log(uploadedFile[0].fd);
					model.update(id,{fd:uploadedFile[0].fd})
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