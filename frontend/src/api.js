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

import axios from "axios";

/**
 * site url
 * @type {string}
 */

const BASE_URL = import.meta.env.VITE_COPIARTS_BASE_URL;

/**
 * @module /frontend/src/api
 * @requires module:axios
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * 
 * @class
 * @classdesc Static class tying together methods used to get/send to to the API.
 * There is nothing frontend-specific here; this is all related to the backend and the database
 */
class CopiartsApi {

    /**
     * turn form's json{} object into FormData() object.
     * this is required for form's that pass file objects
     * @param {Object} form 
     * @returns {FormData}
     */
    static formData(form) {
        const formData = new FormData();
        const formEntries = Object.entries(form);
        
        for (let entry of formEntries) {
            formData.append(entry[0], entry[1]);
        }

        return formData;
    }

    /**
     * pass auth token in the header. initiate axios http request
     * @function
     * @name request
     * @param {string} endpoint - full url
     * @param {Object={}} data - key/value object
     * @param {string=get} method - http method: get, post, delete, patch...
     * @throws {Error} error object related to whatever the backend error was
     * @returns {Object} data returned from backend
     */
    static async request(endpoint, data = {}, method = "get") {
        /**
         * base_url value + endpoint
         * @type {string}
         */
        const url = `${BASE_URL}/${endpoint}`;

        /**
         * url params, if any
         * @type {Object}
         */
        const params = (method === "get") ? data : {};

        try {
            // console.log('ladies and gentlefolk, your API request!');
            // console.log('url', url)
            // console.log('method', method);
            // console.log('data', data);
            // console.log('params', params);
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    //*** ALL ROUTES ***//

    /**
     * generic get request
     * @function
     * @name get
     * @param {string} route - full url. base + endpoint
     * @returns {Object} data returned from backend
     */
    static async get(route) {
        return await this.request(`${route}`);
    }

    /**
     * post feedback form data to db
     * @function
     * @name postComment
     * @param {Object} form feedback form data
     * @returns {Array} success msg and regurgitation of feedback form data.
     */
    static async postComment(form) {
        return await this.request('comments', form, 'post');
    }

    /**
     * post survey form data to db
     * @function
     * @name postSurvey
     * @param {Object} form survey form data
     * @returns {Array} success msg and regurgitation of survey form data.
     */
    static async postSurvey(form) {
        return await this.request('comments/survey', form, 'post');
    }

    /**
     * authenticate admin password. return boolean
     * @function
     * @name loginAdmin
     * @param {Object} form feedback form data
     * @returns {boolean} successful login (or not)
     */
    static async loginAdmin(form) {
        return await this.request('admin', form, 'post');
    }

    /**
     * retrieve all events for the given week from /backend/api/calendar/calendarEvents.json
     * @function
     * @name getWeeklyEvents
     * @returns {Object[event]} data returned from backend
     */
    static async getWeeklyEvents() {
        return await this.request('events/weekly');
    }

    /**
     * update existing calendar event(s) to /backend/api/calendar/calendarEvents.json
     * @function
     * @name updateEvents
     * @param {Object[event]} array of json objects of calendar events
     * @returns {Object[event]} updated event info returned from backend
     */
    static async updateEvents(events) {
        console.log("api events", events);
        return await this.request('events/update', events, 'post');
    } 

    /**
     * post/save new calendar events to /backend/api/calendar/calendarEvents.json
     * @function
     * @name saveEvents
     * @param {Object[event]} array of json objects of calendar events
     * @returns {Object[event]} data returned from backend
     */
    static async saveEvents(events) {
        return await this.request('events', events, 'post');
    }

    /**
     * remove calendar event from /backend/api/calendar/calendarEvents.json
     * @function
     * @name deleteEvents
     * @param {number} eventId id of event in question
     * @returns {Object[event]} data returned from backend. all events MINUS the deleted event.
     */    
    static async deleteEvents(eventId) {
        return await this.request('events', eventId, 'delete');
    }

}

export default CopiartsApi;
