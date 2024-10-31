const express = require("express");
const router = express.Router();
const Person = require('../models/person');
let events;

function parseHost(summary) {
    if (summary.includes('w/ ')) {
        const host = summary.substr(summary.indexOf('w/ ')+3, summary.length);
        return host
    } else {
        return 'unknown unknown';
    }

}

async function setEvents(passedevents) {
    let passedeventsCopy = passedevents;
    for (let e of passedeventsCopy) {
        e.host = parseHost(e.summary);
        e.icon = await Person.fetchPersonIcon(e.host)
    }
	events = passedeventsCopy;
} 

router.get("/", async function(req, res, next) {
    try {
        return res.json(events);
    } catch (err) {
        return next(err);
    }
});

exports.eventsRoutes = router;
exports.setEvents = setEvents;