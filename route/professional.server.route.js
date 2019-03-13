"use strict";
module.exports=function(app){
var professional=require("../controller/professional.server.controller");
app.post("/api/createProfessional", professional.createProfessional);
app.post("/api/profile/upload", professional.profileImgUpload);
app.post("/api/professional/profLicense",professional.profLicense);
app.post("/api/professional/driverLicense",professional.driverLicense);
app.post("/api/professional/profSocialSecurity",professional.profSocialSecurity);
};