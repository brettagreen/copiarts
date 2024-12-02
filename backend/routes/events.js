const express = require("express");
const router = express.Router();
const fs = require("node:fs");

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
        for (let obj of req.body) {
            jsonFile.push(obj)
        }
        const saveFile = JSON.stringify(jsonFile, null, "\t");
        fs.writeFileSync('./api/calendar/CalendarEvents.json', saveFile, 'utf-8')
        return res.send('successfully saved event');
        
    } catch (err) {
        return next(err);
    }
})

router.delete('/', async function(req, res, next) {
    try {
        const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
        const events = JSON.parse(file);
        let filteredEvents;
        let id;

        if (req.body.group_id) {
            id = req.body.group_id;
            filteredEvents = events.filter((event) => {
                return event.group_id !== id;
            });
        } else {
            id = req.body.event_id
            filteredEvents = events.filter((event) => {
                return event.event_id !== id;
            });
        }

        const saveFile = JSON.stringify(filteredEvents, null, "\t");
        fs.writeFileSync('./api/calendar/CalendarEvents.json', saveFile, 'utf-8')
        return res.json(filteredEvents);
        
    } catch (err) {
        return next(err);
    }
})

exports.eventsRoutes = router;
