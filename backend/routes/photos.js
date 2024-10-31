const express = require("express");
const router = express.Router();
let photos;

async function setPhotos(photoURLs) {
	photos = photoURLs;
} 

//return first ??? photos from feed
router.get("/", async function(req, res, next) {
    try {
        return res.json(photos)
    } catch (err) {
        return next(err);
    }
});

exports.photosRoutes = router;
exports.setPhotos = setPhotos;