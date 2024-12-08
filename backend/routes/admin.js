/**
 * @module /backend/routes/admin
 * @requires module:express
 * @requires module:/backend/models/Admin
 * @requires module:express.router
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description handles incoming api requests, initiates appropriate database transaction, returns appriate response
 * 
 */
const express = require("express");
const router = express.Router();
const Admin = require("../models/admin");

/**
 * @description handles request to authenticate admin password, sends req to
 *  Admin class to handle the request, returns true/false
 * @name post/admin
 * @function
 * @param {string} path - /admin
 * @param {callback} middleware - Express middleware.
 * @returns {boolean}
 */
router.post("/", async function(req, res, next) {
    try {
       const admin = await Admin.verifyAdmin(req.body.password);
	   return res.send(admin);
    } catch (err) {
        return next(err);
    }
});

exports.adminRoutes = router;