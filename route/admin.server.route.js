"use strict";
module.exports=function(app){
var admin = require("../controller/admin.server.controller");
app.get("/api/admin/allBusiness",admin.getAllBusiness);
app.get("/api/admin/allUser",admin.getAllUser);
app.get("/api/admin/allProfessionals",admin.getAllProfessionals);
app.get("/api/admin/allBuyers",admin.getAllBuyers);
app.get("/api/admin/allSellers",admin.getAllSellers);
app.post("/api/admin/createBizAdmin",admin.createBizAdmin);
app.get("/api/admin/getBizAdmin",admin.getBizAdmin);
app.post("/api/admin/sendNotification",admin.sendNotification);
app.get("/api/admin/getNotification",admin.getNotification);
app.get("/api/admin/getBuyerNotification",admin.getBuyerNotification);
app.get("/api/admin/getSellerNotification",admin.getSellerNotification);
app.get("/api/admin/getProfessionalNotification",admin.getProfessionalNotification);
app.get("/api/admin/getAdmin",admin.getAdmin);
};