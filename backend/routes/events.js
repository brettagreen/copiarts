/**
 * @typedef {Object} event - calendar event object 
 * @property {number} event_id 
 * @property {number=} group_id
 * @property {string} title
 * @property {Date} start
 * @property {Date} end
 * @property {string} location
 * @property {string} host
 * @property {string} description
 * @property {string=} period
 * 
*/

/**
 * @module /backend/routes/events
 * @requires module:express
 * @requires module:express.router
 * @requires moodule:node.fs
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description handles post, get, and delete requests as pertinent to the frontend Calendar.jsx application/component
 * 
 */
const express = require("express");
const router = express.Router();
const fs = require("node:fs");

/**
 * @description handles request to retrieve all calendar events, pulls all
 * events from /backend/api/calendar/CalendarEvents.json
 * @name get/events
 * @function
 * @param {string} path - /events
 * @param {callback} middleware - Express middleware.
 * @returns {object[event]} - { savedEvents: [{event_id, group_id, title, start, end, location, host, description, period}, ...] }
 */
router.get("/", async function(req, res, next) {
    try {
        const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
        const savedEvents = JSON.parse(file);
        return res.json(savedEvents);
    } catch (err) {
        return next(err);
    }
});

/**
 * @description handles request to retrieve all within current week, pulls all
 * events from /backend/api/calendar/CalendarEvents.json
 * @name get/events/weekly
 * @function
 * @param {string} path - /events/weekly
 * @param {callback} middleware - Express middleware.
 * @returns {Object[event]} - { weeklyEvents: [{event_id, group_id, title, start, end, location, host, description, period}, ...] }
 */
router.get("/daily", async function(req, res, next) {
    try {
        const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
        const allEvents = JSON.parse(file);

        let today = new Date();
        let tomorrow = new Date();
        let midnight = today.toISOString().split('T')[0] + 'T00:00:00.000Z';
        today = new Date(midnight);
        tomorrow = new Date(midnight);

        const beginningOfWeek = today
        const endOfWeek = new Date(tomorrow.setDate(tomorrow.getDate() + 1));

        console.log('beginning', beginningOfWeek);
        console.log('end', endOfWeek);

        const weeklyEvents = allEvents.filter((event) => {
            return new Date(event.start) >= beginningOfWeek && new Date(event.start) <= endOfWeek;
        });

        console.log('backend, weekly events', weeklyEvents);
        return res.send(weeklyEvents);
    } catch (err) {
        return next(err);
    }
});

/**
 * @description handles request to post new calendar event. save to /backend/api/calendar/CalendarEvents.json
 * @name post/events
 * @function
 * @param {string} path - /events
 * @param {callback} middleware - Express middleware.
 * @returns {string} - 'successfully saved event'
 */
router.post('/', async function(req, res, next) {
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
});

/**
 * @description handles request to post new calendar event. save to /backend/api/calendar/CalendarEvents.json
 * @name post/events/update
 * @function
 * @param {string} path - /events/update
 * @param {callback} middleware - Express middleware.
 * @returns {string} - 'successfully saved event'
 */
router.post('/update', async function(req, res, next) {
    const updates = req.body;
    const filterType = updates[0].group_id ? "groupId" : "eventId";
    const filterId = updates[0].group_id || updates[0].event_id;
    let filteredEvents;
    
    try {
        const file = fs.readFileSync('./api/calendar/CalendarEvents.json', 'utf-8');
        const jsonFile = JSON.parse(file);

        if (filterType === "groupId") {
            filteredEvents = jsonFile.filter((event) => {
                return event.group_id !== filterId;
            });
        } else {
            filteredEvents = jsonFile.filter((event) => {
                return event.event_id !== filterId;
            });
        }

        for (let update of updates) {
            filteredEvents.push(update);
        }
        
        const saveFile = JSON.stringify(filteredEvents, null, "\t");
        fs.writeFileSync('./api/calendar/CalendarEvents.json', saveFile, 'utf-8')
        return res.send('successfully updated event(s)');
        
    } catch (err) {
        return next(err);
    }
});

/**
 * @description handles request to delete calendar event. save to /backend/api/calendar/CalendarEvents.json
 * @name delete/events
 * @function
 * @param {string} path - /events
 * @param {callback} middleware - Express middleware.
 * @returns {object[event]} - { filteredEvents: [{event_id, group_id, title, start, end, location, host, description, period}, ...] }
 */
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
