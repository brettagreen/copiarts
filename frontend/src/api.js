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

}

export default CopiartsApi;
