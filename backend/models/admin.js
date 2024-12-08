"use strict";

/**
 * db module
 * @const
 */
const db = require("../db");

/**
 *
 * bcrypt module
 * @const
 */
const bcrypt = require('bcrypt');

const { UnauthorizedError } = require("../expressError");

/**
 * @module /backend/models/admin
 * @requires module:/backend/db
 * @requires module:bcrypt
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @class
 * @classdesc database CRUD operations related to admin table.
 * 			  Specifically, auth of admin password.
 */

class Admin {
	
	/**
     * @description authenticate passed admin password
	 * 
     * @param {string} password - passed admin password
 	 * @throws {UnauthorizedError}
     * @returns {boolean} - true
     */
    static async verifyAdmin(password) {

		/**
		 * pw value returned from db
		 * @type {string}
		 */
        const result = await db.getClient().query(
            `SELECT password
            FROM admin`);

		/**
		 * whether password is valid or not
		 * @type {boolean}
		 */
		const goodPassword = await bcrypt.compare(password, result.rows[0].password);
        console.log('good password?', goodPassword);

		if (!goodPassword) {
			throw new UnauthorizedError('Bad password!');
		} else {
			return true;
		}
    }
}

module.exports = Admin;
