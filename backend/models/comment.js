"use strict";

/**
 * db module
 * @const
 */
const db = require("../db");

const { NotFoundError, BadRequestError } = require("../expressError");

class Comment {

    /**
     * return all comments
     *
     */
    static async fetchComments() {
        const result = await db.getClient().query(
            `SELECT nameFirst + ' ' nameLast AS "name", email, comment
            FROM comments`);

        if (result.rows.length < 1) throw new NotFoundError(`no comments found`);

        return result.rows;
    }

	static async postComment({nameFirst, nameLast, email, comment}) {
		const result = await db.getClient().query(
			`INSERT INTO comments
			(namefirst,
			namelast,
			email,
			comment)
			VALUES ($1, $2, $3, $4)
			RETURNING namefirst AS "nameFirst", namelast AS "nameLast", email, comment`,
			[nameFirst, nameLast, email, comment]
		)

		return result.rows[0];
	}
}

module.exports = Comment;
