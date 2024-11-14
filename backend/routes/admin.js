const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

router.post("/", async function(req, res, next) {
    try {
       const admin = await Admin.verifyAdmin(req.body.password);
	   return res.send(admin);
    } catch (err) {
        return next(err);
    }
});

exports.adminRoutes = router;