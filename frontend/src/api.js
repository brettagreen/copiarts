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

    static formData(form) {
        const formData = new FormData();
        const formEntries = Object.entries(form);
        
        for (let entry of formEntries) {
            formData.append(entry[0], entry[1]);
        }

        return formData;
    }

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
            console.log('url', url)
            console.log('method', method);
            console.log('data', data);
            console.log('params', params);
            return (await axios({ url, method, data, params })).data;
        } catch (err) {
            console.error("API Error:", err.response);
            let message = err.response.data.error.message;
            throw Array.isArray(message) ? message : [message];
        }
    }

    //*** ALL ROUTES ***//

    /**
     * get request
     * @function
     * @name get
     * @param {string} route - full url. base + endpoint
     * @returns {Object} data returned from backend
     */
    static async get(route) {
        return await this.request(`${route}`);
    }

    static async postComment(form) {
        return await this.request('comments', form, 'post');
    }

    static async loginAdmin(form) {
        return await this.request('admin', form, 'post');
    }

    static async saveEvent(event) {
        return await this.request('events', event, 'post');
    }

}

export default CopiartsApi;
