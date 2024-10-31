"use strict";
//typedefs
/**
 * @typedef {Object} article - returned article object 
 * @property {number=} articleId 
 * @property {string} articleTitle
 * @property {string} authorFirst
 * @property {string} authorLast
 * @property {string=} authorHandle
 * @property {number=} authorId
 * @property {string} text
 * @property {string} issueTitle
 * @property {number=} issueId
 * @property {Date=} pubDate
 *
*/

/**
 * db module
 * @const
 */
const db = require("../db");

const { NotFoundError, BadRequestError } = require("../expressError");

/**
 * @module /backend/models/article
 * @requires module:/backend/db
 * @requires module:/backend/expressError.NotFoundError
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @class
 * @classdesc database CRUD operations related to articles table
 */
class Person {

    /**
     * @description create new article and save to database
     * @param {!string} articleTitle - article title
     * @param {number=} authorId - id of article author
     * @param {!string} text - article text/content
     * @param {number=} issueId - id of issue article is associated with
     * @returns {article} - { id, articleTitle, authorFirst, authorLast, authorHandle, authorId, text, issueTitle, issueId }
     */
	// static async create({ articleTitle, authorId, text, issueId }) {

    //     /**
    //      * the sql query string
    //      * @type {string}
    //      *
    //      */
    //     let query;

    //     /**
    //      * argument values passed to the sql query string
    //      * @type {string|number[]}
    //      */
    //     let args;

    //     //based on passed parms/args, write specific query for specific insert operation
    //     if (!authorId && !issueId) {
    //         query =
    //             `INSERT INTO articles 
    //                 (article_title,
    //                 text)
    //                 VALUES ($1, $2)
    //                 RETURNING id, article_title AS "articleTitle", 
    //                 author_id AS "authorId", text,
    //                 issue_id AS "issueId"`;

    //         args = [articleTitle, text];

    //     } else if (!authorId) {
    //         query =
    //             `INSERT INTO articles 
    //                 (article_title,
    //                 text,
    //                 issue_id)
    //                 VALUES ($1, $2, $3)
    //                 RETURNING id, article_title AS "articleTitle",
    //                 author_id AS "authorId", text, (SELECT issue_title AS "issueTitle" FROM issues WHERE id = $3),
    //                 issue_id AS "issueId"`;

    //         args = [articleTitle, text, issueId];

    //     } else if (!issueId) {
    //         query =
    //             `INSERT INTO articles 
    //                 (article_title,
    //                 author_id,
    //                 text)
    //                 VALUES ($1, $2, $3)
    //                 RETURNING id, article_title AS "articleTitle", 
    //                 (SELECT author_first AS "authorFirst" FROM authors WHERE id = $2), 
    //                 (SELECT author_last AS "authorLast" FROM authors WHERE id = $2),
    //                 (SELECT author_handle AS "authorHandle" FROM authors WHERE id = $2),
    //                 author_id AS "authorId", text, issue_id AS "issueId"`;

    //         args = [articleTitle, authorId, text];
    //     } else {
    //         query =
    //             `INSERT INTO articles 
    //                 (article_title,
    //                 author_id,
    //                 text,
    //                 issue_id)
    //                 VALUES ($1, $2, $3, $4)
    //                 RETURNING id, article_title AS "articleTitle", 
    //                 (SELECT author_handle AS "authorHandle" FROM authors WHERE id = $2),
    //                 author_id AS "authorId", text, (SELECT issue_title AS "issueTitle" FROM issues WHERE id = $4),
    //                 issue_id AS "issueId"`;

    //         args = [articleTitle, authorId, text, issueId];
    //     }
        
    //     let result;
    //     try {
    //         result = await db.getClient().query(query, args);
    //     } catch (error) {
    //         throw new BadRequestError('duplicate entry: this article already exists');
    //     }
		
        
    //     if (text.length > 200) {
    //         result.rows[0].text = text.substring(0, 200) + "...";
    //     }
    //     /**@type {article} */
    //     return result.rows[0];

	// }

    /**
     * @description returns all articles.
     *
     * @returns {Object[article]} - [{ id, articleTitle, authorFirst, authorLast, authorId, text, issueTitle, issueId }, ...]
     */
    // static async getAll() {
    //     const result = await db.getClient().query(
    //         `SELECT a.id,
    //                 a.article_title AS "articleTitle",
    //                 w.author_first AS "authorFirst",
    //                 w.author_last AS "authorLast",
    //                 w.id AS "authorId",
    //                 a.text,
    //                 i.issue_title AS "issueTitle",
    //                 i.id AS "issueId"
    //         FROM articles a
    //         LEFT JOIN authors w ON a.author_id = w.id
    //         LEFT JOIN issues i ON a.issue_id = i.id
    //         ORDER BY LOWER(a.article_title)`);

    //     return result.rows;
    
    // }

    /**
     * @description given an article id, return article.
     *
     * @param {number} id - Article id
     * @throws {notFoundError}
     * @returns {article} - { articleId, articleTitle, authorFirst, authorLast, authorHandle, text, issueId, issueTitle, pubDate }
     */
    // static async get(id) {
    //     const result = await db.getClient().query(
    //             `SELECT a.id AS "articleId",
    //                     a.article_title AS "articleTitle",
    //                     w.author_first AS "authorFirst",
    //                     w.author_last AS "authorLast",
    //                     w.author_handle AS "authorHandle",
    //                     a.text,
    //                     i.id AS "issueId",
    //                     i.issue_title AS "issueTitle",
    //                     i.pub_date AS "pubDate"
    //             FROM articles a
    //             LEFT JOIN authors w ON a.author_id = w.id
    //             LEFT JOIN issues i ON a.issue_id = i.id
    //             WHERE a.id = $1`, [id]);

    //     /** @type {article} */
    //     const article = result.rows[0];

    //     if (!article) throw new NotFoundError(`No article found by that id: ${id}`);

    //     return article;
    // }

    /**
     * return person per person's name
     *
     * @param {string} handle - handle/nickname of Author
     * @throws {NotFoundError}
     * @returns {Object[article]} - [{articleId, articleTitle, authorFirst, authorLast, authorHandle, text, issueId, issueTitle, pubDate}, ...]
     */
    static async fetchPersonIcon(host) {
        const result = await db.getClient().query(
            `SELECT icon
            FROM people
            WHERE LOWER(person_handle) LIKE LOWER($1)`,
			[host]);

        if (result.rows.length < 1) throw new NotFoundError(`No one found by that name: ${host}`);

        return result.rows[0].icon;
    }

    /**
     * @description updates an article. all article fields can be modified.
     *
     * @param {number} id - id of article to be updated
     * @param {Object} body - http request body object. this included all article fields to be updated. 
     * if specific field isn't being updated, i.e. isn't included in the body object, then sql update statement
     * will fall back to existing value
     * @throws {NotFoundError}
     * @returns {article} - { articleTitle, author, authorHandle, text, issueTitle }
     */
    // static async update(id, body) {
    //     //get the article in question
    //     let r = await db.getClient().query(
    //         `SELECT * FROM articles WHERE id=$1`, [id]
    //     );
        
    //     //if article ain't found, throw an exception
	// 	if (!r.rows[0]) throw new NotFoundError(`No article found by that id: ${id}`);

    //     r = r.rows[0];

	// const result = await db.getClient().query(
    //         `UPDATE articles a
    //         SET article_title = $1,
    //         author_id = $2,
    //         text = $3,
    //         issue_id = $4
    //         WHERE a.id = $5
    //         RETURNING a.article_title AS "articleTitle",
    //             (SELECT CONCAT(author_first,' ', author_last) AS "author" FROM authors WHERE id = a.author_id),
    //             (SELECT author_handle AS "authorHandle" FROM authors WHERE id = a.author_id),
    //             a.text,
    //             (SELECT issue_title AS "issueTitle" FROM issues WHERE id = a.issue_id)`,
    //         [
    //             body.articleTitle || r.article_title,
    //             body.authorId || r.author_id,
    //             body.text || r.text,
    //             body.issueId || r.issue_id,
    //             id
    //         ]
    //     );

    //     if ((result.rows[0].text).length > 200) {
    //         result.rows[0].text = (result.rows[0].text).substring(0, 200) + "...";
    //     }

    //     return result.rows[0];
	// }

    /**
     * @description Deletes article from database.
     * 
     * @param {number} id - id of article to be deleted
     * @throws {NotFoundError}
     * @returns {article} - { articleTitle, author, authorHandle, text, issueTitle }
     */
    // static async delete(id) {

    //     const result = await db.getClient().query(
    //         `DELETE
    //         FROM articles
    //         WHERE id = $1
    //         RETURNING article_title AS "articleTitle", 
    //                 (SELECT CONCAT(a.author_first,' ', a.author_last) AS "author" FROM authors a WHERE a.id = author_id),
    //                 (SELECT a.author_handle AS "authorHandle" FROM authors a WHERE a.id = author_id),
    //                 text, (SELECT i.issue_title AS "issueTitle" FROM issues i WHERE i.id = issue_id)`, 
    //         [Number(id)]
    //     );

    //     if (!result.rows[0]) throw new NotFoundError(`No article found by that id: ${id}`);

    //     return result.rows[0];
    // }

}

module.exports = Person;
