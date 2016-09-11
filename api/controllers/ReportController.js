/**
 * ReportController
 *
 * @description :: Server-side logic for managing reports
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	'create' : function(req, res, next) {
		// callback of report find result
			var dated = new Date();
			Report.create({hid: req.session.hid,
										hname: req.session.hname,
									doo : dated.getTime(),
									amt : req.param('amt')
										},
									function(err, result) {
										if(err) {
											console.log(err);
										}
									});
			res.redirect('/user/democheck');
	},

	'deci' : function(req, res, next) {
		var reports = Report.find({hid:req.param('id')});
		var objtosend;
		reports.sort('doo DESC');
		reports.exec(function callback(err, repres){
			objhelper.getCounter(repres,'amt', function(count, sum) {
						objtosend = {
							'objects' : repres,
							'count' : count,
							'sum' : sum
							};
						res.send(JSON.stringify(objtosend));

				});
		});

	}
};
