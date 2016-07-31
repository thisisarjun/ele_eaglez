/*
	used to upload/download files.
*/
var fs = require('fs');
module.exports = {
	//basic upload using skipper, updloads and add the file descriptor to the record.
	/*
	skipper_obj -> req.file('field')
	id -> record id
	model -> corresponding model
	path -> path to save, know that you are starting from assets/images/	
	*/
	'upload' : function(skipper_obj, id, model,path) {
				console.log('inside filefun upload');
				var path = '/assets/images/'+path;	
				//console.log(process.cwd() + path);	
				skipper_obj.upload({
					dirname : process.cwd()+path,
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
					
	},

	'delete' : function(model, uid, path,callback) {
		var path = '/assets/images/'+path;
		path = process.cwd() + path;
		//console.log('the path is ' + path);
		model.findOne({id : uid }, function(err, userobj){
			path = path+userobj.fd;
			try {
				fs.unlinkSync(path);
			}catch(e) {
				return callback(e);
			}
			var result = true;
			return callback(null);
		});
	}

};