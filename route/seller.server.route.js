"use strict";
module.exports = function (app) {
    var seller = require("../controller/seller.server.controller");
    
    app.get("/api/getImage/:id", seller.getSecImage);
    app.post("/api/createBiz", seller.userdate);
    app.get("/api/getUserBiz/:id", seller.getUserBiz);

    app.post("/api/upload", seller.uploadImage);
    app.post("/api/upload/edit", seller.editUploadImage);
    app.post("/api/upload/multi", seller.multiUploadImage);
    app.post("/api/upload/edit/multi", seller.multiUpdateImage);
    app.delete("/api/upload/deleteSecImages/:id", seller.deleteSecImages);

    app.post("/api/profile/upload", seller.profileImgUpload);

    
    app.get("/api/getProcessbyCmp/:id", seller.getProcessbyCmp);

};