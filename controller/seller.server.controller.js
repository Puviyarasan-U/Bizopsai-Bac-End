"use strict";
var config = require("../config/manager/SellerManager");

exports.getSecImage = function (req, res) {
	var v1 = req.params.id;
	config.getSecImage(v1, function (err, result) {
		res.send(result);
	});
};
exports.userdate = function (req, res) {
	var v1 = req.body;	
	config.userdate(v1, function (err, rows) {
		var str = rows[0][0].value;
		res.status(200).send(str.toString());
	});

};
exports.getUserBiz = function (req, res) {
	var v1 = req.params.id;	
	config.getUserBiz(v1, function (err, result) {
		res.send(result);
	});
};


exports.getProcessbyCmp = function (req, res) {
	var v1 = req.params.id;	
	config.getProcessbyCmp(v1, function (err, result) {
		res.send(result);
	});
};

exports.uploadImage = function (req, res) {
	config.uploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};

exports.profileImgUpload = function (req, res) {
	config.profileImgUpload(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.editUploadImage = function (req, res) {
	config.editUploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});
};
exports.multiUploadImage = function (req, res) {
	config.multiUploadImage(req, res, function (err, result) {
		res.send("Uploaded Sucessfully");
	});

};

exports.deleteSecImages = function (req, res) {
	var v1 = req.params.id;
	config.deleteSecImages(v1, function (err, result) {
		res.send(result);
	});
};
exports.multiUpdateImage = function (req, res) {
	config.multiUpdateImage(req, res, function (err, result) {
		res.send("Updated Sucessfully");
	});
};