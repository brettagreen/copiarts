"use strict";

/**
 * db module
 * @const
 */
const db = require("../db");
const bcrypt = require('bcrypt');

const { UnauthorizedError } = require("../expressError");

class Admin {

    static async verifyAdmin(password) {
        const result = await db.getClient().query(
            `SELECT password
            FROM admin`);

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
