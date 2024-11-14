const express = require("express");
const router = express.Router();
const fs = require("node:fs");
const dayjs = require('dayjs');

router.get("/", async function(req, res, next) {
    try {
        const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
        const savedEvents = JSON.parse(file);
        return res.json(savedEvents);
    } catch (err) {
        return next(err);
    }
});

router.post('/', async function(req, res, next) {
    console.log('req.body', req.body)
    try {
        const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
        const jsonFile = JSON.parse(file);
        jsonFile.push(req.body);
        const saveFile = JSON.stringify(jsonFile, null, "\t");
        fs.writeFileSync('./api/calendar/CalendarEvents.json', saveFile, 'utf-8')
        return res.send('successfully saved event');
        
    } catch (err) {
        return next(err);
    }
})

router.delete('/', async function(req, res, next) {
    console.log('eventId', req.body)
    try {
        const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
        const events = JSON.parse(file);

        const filteredEvents = events.filter((event) => {
            return event.event_id !== req.body.eventId
        });

        const saveFile = JSON.stringify(filteredEvents, null, "\t");
        fs.writeFileSync('./api/calendar/CalendarEvents.json', saveFile, 'utf-8')
        return res.json(filteredEvents);
        
    } catch (err) {
        return next(err);
    }
})

exports.eventsRoutes = router;
