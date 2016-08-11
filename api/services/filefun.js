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
	'upload' : function(skipper_obj, id, model,fpath) {
				console.log('inside filefunction upload');
				var path = process.cwd()+'/assets/images/'+fpath;
				console.log('path is '+path);
				var tempath = process.cwd()+'/.tmp/public/images/'+fpath;
				console.log('tempath is '+ tempath);
				console.time('upload start time');						
				skipper_obj.upload({
					dirname : path,
					maxBytes : 10000000				
				}, function(err,uploadedFile){
					//if no file uploaded.
					console.timeEnd('upload start time');
						console.log('upload done');
						console.log(uploadedFile);
						if(uploadedFile[0].size == 0) {
							console.log('ok');
							req.session.flash = {
								'message' : 'no file was uploaded'
							};
							return;
						}
						var fname = uploadedFile[0].fd.substring(uploadedFile[0].fd.lastIndexOf('/') + 1);
						path = path + fname;
						tempath = tempath + fname;
						console.log('before readstream, path is'+path);
						console.log('before readstream, tempath is'+tempath);
						fs.createReadStream(path).pipe(fs.createWriteStream(tempath));
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

	'delete' : function( oldfd, fpath) {
		var path = process.cwd() +'/assets/images/'+fpath+oldfd;
		var tempath = process.cwd()+'/.tmp/public/images/'+fpath+oldfd;
		console.log('the path in delete fun is ' + path);
		console.log('the temppath in delete fun is ' + path);
		try {
			fs.unlinkSync(path);
			fs.unlinkSync(tempath);
		}catch(e) {
			console.log(e);
		}

	}

};