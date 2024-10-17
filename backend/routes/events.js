const express = require("express");
const router = express.Router();
let events;

function setEvents(passedevents) {
	events = passedevents;
} 

router.get("/", function (req, res, next) {
	try {
		return res.json(events);
	} catch (err) {
        return next(err);
    }
});

exports.eventsRoutes = router;
exports.setEvents = setEvents;