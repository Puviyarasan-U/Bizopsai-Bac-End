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

config.on('connect', err => {
    if (err) {
        console.log('ON', err);
    } else {
        console.log("database connected");
    }
});
function getAllBusiness(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM COMPANY_DETAILS";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getAllUser(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM [USER]";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getAllProfessionals(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT *  FROM PROFESSIONALS_DATA";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getAllBuyers(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT *  FROM BUYER_DETAILS";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getAllSellers(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT DISTINCT USER_ID FROM COMPANY_DETAILS";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function createBizAdmin(v1, cb) {
    console.log(v1);
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "SP_CreateBizAdmin";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
               
                console.log(err);
            } else {     
                console.log(rows);
                cb(null, rows);              
            }
            connection.release();
        });   
        request.addParameter('BIZADMIN_NAME', sql.VarChar, v1.bizAdminName);
        request.addParameter('BIZADMIN_EMAIL', sql.VarChar, v1.bizAdminEmail);
        request.addParameter('BIZADMIN_PASSWORD', sql.VarChar, v1.bizAdminPassword);           
        connection.callProcedure(request);
    });
}
function getBizAdmin(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT *  FROM BIZADMIN";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
// function sendNotification(v1, cb) {
//     console.log(v1);
//     config.acquire(function (err, connection) {
//         if (err) {
//             console.error(err);
//             return;
//         }
//         var query = "INSERT INTO ADMIN_NOTIFICATION  VALUES ('"+ v1.notify +"',GetDate(),1,'"+v1.user+"')";
//         console.log(v1);
//         const request = new Request(query, (err, rowCount, rows) => {
//             if (err) {
//                 console.log(err);
//             } else {
//                 cb(null, rowCount);
//             }
//             connection.release();
//         });
//         connection.execSql(request);
//     });
// }
function sendNotification(v1, cb) {
    console.log(v1);
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var query = "sp_adminNotification";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
               
                console.log(err);
            } else {     
                console.log(rows);
                cb(null, rows);              
            }
            connection.release();
        });   
        request.addParameter('NOTIFICATION', sql.VarChar, v1.notify);
        request.addParameter('USER', sql.VarChar, v1.user);                 
        connection.callProcedure(request);
    });
}
function getNotification(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT *  FROM ADMIN_NOTIFICATION";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getBuyerNotification(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT *  FROM ADMIN_NOTIFICATION WHERE USER_FLAG IN(3,5) ";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getSellerNotification(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT *  FROM ADMIN_NOTIFICATION WHERE USER_FLAG IN(2,5)";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getProfessionalNotification(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT *  FROM ADMIN_NOTIFICATION WHERE USER_FLAG IN(4,5)";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
function getAdmin(cb) {
    config.acquire(function (err, connection) {
        if (err) {
            console.error(err);
            return;
        }
        var jsonArray = [];
        var query = "SELECT * FROM [USER] where FLAG = 1";
        const request = new Request(query, (err, rowCount, rows) => {
            if (err) {
                console.log(err)
            } else {

                for (let i = 0; i < rowCount; i++) {
                    var rowObject = {};
                    var singleRowData = rows[i];
                    for (let j = 0; j < singleRowData.length; j++) {
                        var tempColName = singleRowData[j].metadata.colName;
                        var tempColData = singleRowData[j].value;
                        rowObject[tempColName] = tempColData;
                    }
                    jsonArray.push(rowObject);
                }

                if (jsonArray.length > 0) {
                    // console.log(jsonArray);
                    cb(null, jsonArray);
                }
                else {
                    cb(null, [{"status": "No Data Found"}]);
                }
            }
            connection.release();
        });
        connection.execSql(request);
    });
}
module.exports = {
    getAllBusiness:getAllBusiness,
    getAllUser:getAllUser,
    getAllProfessionals:getAllProfessionals,
    getAllBuyers:getAllBuyers,
    createBizAdmin:createBizAdmin,
    getBizAdmin:getBizAdmin,
    sendNotification:sendNotification,
    getNotification:getNotification,
    getBuyerNotification:getBuyerNotification,
    getSellerNotification:getSellerNotification,
    getProfessionalNotification:getProfessionalNotification,
    getAdmin:getAdmin,
    getAllSellers:getAllSellers
   
};