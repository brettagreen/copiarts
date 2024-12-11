"use strict";
/**
 * @typedef {Object} comment - returned comment/feedback object 
 * @property {string} name 
 * @property {string} email
 * @property {string} comment
 *
*/

/**
 * db module
 * @const
 */
const db = require("../db");

const { NotFoundError } = require("../expressError");

/**
 * @module /backend/models/comment
 * @requires module:/backend/db
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @class
 * @classdesc database CRUD operations related to comments table.
 * 			  Specifically, posting and retrieving comments/feedback
 */
class Comment {

    /**
     * return all comments
     * @throws {NotFoundError}
	 * @returns {Object[comment]} - [{ name, email, comment }, ...]
     */
    static async fetchComments() {
		/**
		 * all comments/feedback objects from database
		 * @type {object[]}
		 */
        const result = await db.getClient().query(
            `SELECT nameFirst + ' ' nameLast AS "name", email, comment
            FROM comments`);

        if (result.rows.length < 1) throw new NotFoundError(`no comments found`);

        return result.rows;
    }

	/**
     * @description post new feedback item to database
	 * 
     * @param {string} nameFirst - feedback leaver's first name
     * @param {string=} nameLast - feedback leaver's last name
     * @param {string} email - feedback leaver's email address
     * @param {string} comment - the feedback
     * @returns {comment} - { name, email, comment }
     */
	static async postComment({nameFirst, nameLast, email, comment}) {
		let result;
		if (nameLast) {
			result = await db.getClient().query(
				`INSERT INTO comments
				(namefirst,
				namelast,
				email,
				comment)
				VALUES ($1, $2, $3, $4)
				RETURNING CONCAT(namefirst, ' ', namelast) AS "name", email, comment`,
				[nameFirst, nameLast, email, comment]
			)
		} else {
			result = await db.getClient().query(
				`INSERT INTO comments
				(namefirst,
				email,
				comment)
				VALUES ($1, $2, $3)
				RETURNING namefirst AS "name", email, comment`,
				[nameFirst, email, comment]
			)
		}

		return result.rows[0];
	}
}

module.exports = Comment;
