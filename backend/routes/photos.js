/**
 * @typedef {Object} photo - photo related data 
 * @property {string} media_url 
 * @property {string} caption
 * @property {string} permalink
 * @property {string} timestamp
 *
*/

/**
 * @module /backend/routes/photos
 * @requires module:express
 * @requires module:express.router
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description endpoint for the frontend to easily retrieve Instagram photos
 * 
 */
const express = require("express");
const router = express.Router();
let photos;

/**
 * @function
 * @param {object[photo]} photoURLs - Photo/media objects 
 */
async function setPhotos(photoURLs) {
	photos = photoURLs;
} 

/**
 * @description handles request to retrieve all photos
 * @name get/photos
 * @function
 * @param {string} path - /photos
 * @param {callback} middleware - Express middleware.
 * @returns {object[photo]} - { photos: [{media_url, caption, permalink, timestamp}, ...]}
 */
router.get("/", async function(req, res, next) {
    try {
        return res.json(photos)
    } catch (err) {
        return next(err);
    }
});

exports.photosRoutes = router;
exports.setPhotos = setPhotos;