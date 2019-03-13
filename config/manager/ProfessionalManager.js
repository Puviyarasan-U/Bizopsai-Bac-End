"use strict";

var db = require("../db");
const multer = require('multer');
const ConnectionPool = require('tedious-connection-pool');
const Request = require('tedious').Request;
const sql = require('tedious').TYPES;
var poolConfig = {
    min: 1,
    max: 40,
    log: true
};
const config = new ConnectionPool(poolConfig, db);
config.acquire(function (err, connection) {
    if (err) {
        console.error(err);
        return;
    }
    var request = new Request('select 42', function (err, rowCount) {
        if (err) {
            console.error(err);
            return;
        }
        console.log('rowCount: ' + rowCount);
        //release the connection back to the pool when finished
        connection.release();
    });

    request.on('row', function (columns) {
        console.log('value: ' + columns[0].value);
    });
    connection.execSql(request);

});

config.on('connect', err => {
    if (err) {
        console.log('ON', err);
    }
    else {
        console.log("database connected");
    }
});

config.on('error', err => {
    if (err) {
        console.log('Error', err);
    }
    else {
        console.log("database connected !!!");

    }
});
const profLiDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const driverLiDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const profSocDir = 'C:\\inetpub\\wwwroot\\assets\\img\\documents';
const profileDir = 'C:\\inetpub\\wwwroot\\assets\\img';
var up_filename = "";
function createProfessional(v1, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        //  var query = "SP_CreateProfessional";
        // var query = "SP_CreateProfessionals";   
        var query = "SP_Professionals"    
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err);
            } else {
                cb(null, rows);
            }
            connection.release();
        });
        request.addParameter('ID', sql.VarChar, v1.id);
        request.addParameter('USERNAME', sql.VarChar, v1.UserName);
        request.addParameter('HOME_ADDRESS', sql.VarChar, v1.homeAddress);
        request.addParameter('PROF_EMAIL', sql.VarChar, v1.emailAddress);
        request.addParameter('FAX_NUMBER', sql.VarChar, v1.faxNumber);
        request.addParameter('CELL_NUMBER', sql.VarChar, v1.cellPhone);
        request.addParameter('HOME_PHONE_NUMBER', sql.VarChar, v1.homePhone);
        request.addParameter('DOB', sql.VarChar, v1.dob);
        request.addParameter('PLACE', sql.VarChar, v1.birthPlace);
        request.addParameter('HOME_TELEPHONE', sql.VarChar, v1.homeTelePhone);
        request.addParameter('BEST_TELEPHONE', sql.VarChar, v1.bestTelePhone);
        request.addParameter('CATEGORY', sql.VarChar, v1.Category);
        request.addParameter('SUBCATEGORY', sql.VarChar, v1.SubCategory);        
        request.addParameter('COMPANY_NAME', sql.VarChar, v1.companyName);
        request.addParameter('BUSINESS_ADDRESS', sql.VarChar, v1.businessAddress);
        request.addParameter('BUSINESS_EMAIL', sql.VarChar, v1.businessEmail);
        request.addParameter('USER_ID',sql.VarChar,v1.UserId);
        request.addParameter('PROF_TELEPHONE', sql.VarChar, v1.telePhoneNumber);
        request.addParameter('WEBSITE', sql.VarChar, v1.websiteName);
        request.addParameter('INS_NAME', sql.VarChar, v1.insName);
        request.addParameter('INS_TELEPHONE', sql.VarChar, v1.insTelePhoneNumber);
        request.addParameter('INS_ADDRESS', sql.VarChar, v1.insAddress);
        request.addParameter('INS_TYPE', sql.VarChar, v1.insuranceType);
        request.addParameter('INS_EMAIL', sql.VarChar, v1.insEmail);   
        connection.callProcedure(request);
    });
}
let profilePicStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profileDir);
    },
    filename: (req, file, cb) => {
        up_filename = file.fieldname + '-' + Date.now() + '.jpg';
        cb(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});
let profLicenseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profLiDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let driverLicenseStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, driverLiDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});
let profSocialStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profSocDir);
    },
    filename: (req, file, cb) => {
        //console.log("filename",req.body.user);
        up_filename = file.fieldname + '-' + Date.now() + '.pdf';
        cb(null, up_filename);
    }
});

var proflicensePic = multer({ storage: profLicenseStorage }).single('profLicense');
var driverLicensePic = multer({ storage: driverLicenseStorage }).single('license');
var profSocialPic = multer({ storage: profSocialStorage }).single('profSocialSecurity');
var profilePic = multer({storage: profilePicStorage}).single('profileImage');
function profLicense(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        proflicensePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            if (err) {
                console.log(err);
                cb(null, err);
            }       
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_profLicenseReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('PROF_LICENSE_REPORT', sql.VarChar, up_filename);
                request.addParameter('PROF_LICENSE_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );  
                request.addParameter('USER_ID', sql.VarChar,user_id );             
                connection.callProcedure(request);   
        });
    });
}
function driverLicense(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        driverLicensePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            if (err) {
                console.log(err);
                cb(null, err);
            }       
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_driverLicReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('DRIVER_LICENSE_REPORT', sql.VarChar, up_filename);
                request.addParameter('DRIVER_LICENSE_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user ); 
                request.addParameter('USER_ID', sql.VarChar,user_id );             
                connection.callProcedure(request);   
        });
    });
}
function profSocialSecurity(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var ID = '';
        var user_id='';
        profSocialPic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            }
            if (err) {
                console.log(err);
                cb(null, err);
            }       
                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;
                ID = req.body.ID;
                user_id = req.body.user_id;
                var query = "SP_profSocReport";
                const request = new Request(query, (err, rowCount, rows) => {
                    if (err) {
                       
                        console.log(err);
                    } else {     
                        console.log(rows);
                        cb(null, rows);
                       
                     
                    }
                    connection.release();
                });          
                request.addParameter('ID', sql.Int, ID);
                request.addParameter('PROF_SOC_REPORT', sql.VarChar, up_filename);
                request.addParameter('PROF_SOC_REPORT_DIRECTORY', sql.VarChar,path );
                request.addParameter('USER_NAME', sql.VarChar,user );   
                request.addParameter('USER_ID', sql.VarChar,user_id );           
                connection.callProcedure(request);   
        });
    });
}
function profileImgUpload(req, res, cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var path = '';
        var filename = '';
        var user = '';
        var company_id = '';
        var user_id='';
        var ID='';
        profilePic(req, res, function (err) {
            if (err) {
                console.log(err);
                cb(null, err);
            } else {

                filename = req.file.filename;
                path = req.file.path;
                user = req.body.UserName;
                ID = req.body.ID;
                console.log(company_id);
                console.log("ggg")
                // var query = "INSERT INTO PROFESSIONAL_IMAGES VALUES ('" + user + "','" + up_filename + "','" + path + "','"+ID+"') ";
                var query = "INSERT INTO PROFESSIONAL_IMAGES VALUES ('" + user + "','" + up_filename + "','" + path + "','"+ID+"') ";
                console.log(query)
                const request = new Request(query, function (err, rowCount, rows) {
                    if (err) {
                        console.log(err)
                    } else {
                        console.log(rows);
                        cb(null, rowCount);
                    }
                    connection.release();
                });
                connection.execSql(request);
            }
        });
    });
}

module.exports = {
    createProfessional:createProfessional,
    profileImgUpload:profileImgUpload,
    profLicense:profLicense,
    driverLicense:driverLicense,
    profSocialSecurity:profSocialSecurity


    
};