/**
 * @module /backend/routes/comments
 * @requires module:express
 * @requires module:/backend/models/Comment
 * @requires module:express.router
 * @requires modeule:nodemailer
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description handles incoming api requests, initiates appropriate database transaction, returns appriate response
 * 
 */

/**
 * @typedef {Object} comment - returned comment/feedback object 
 * @property {string} name 
 * @property {string} email
 * @property {string} comment
 *
*/

const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const nodemailer = require("nodemailer");
// /**
//  * new article schema def
//  * @const
//  */
// const newCommentSchema = require("../schemas/commentNew.json");

/**
 * @description handles request to retrieve all feedback, sends req to
 *  Comment class to handle the request, returns string confirmation or error
 * @name get/comments
 * @function
 * @param {string} path - /comments
 * @param {callback} middleware - Express middleware.
 * @returns {Object[comment]} - { comments: [{ name, email, comment }, ...] }
 */
router.get("/", async function(req, res, next) {
    try {
       const comments = await Comment.fetchComments();
	   return res.json({comments});
    } catch (err) {
        return next(err);
    }
});

/**
 * @description handles request to enter new user feedback, sends req to
 *  Comment class to handle the request, returns string confirmation or error
 * @name post/comments
 * @function
 * @param {string} path - /comments
 * @param {callback} middleware - Express middleware.
 * @returns {object} - {msg: "thank you for your feedback", feedback: comment.name, comment.email, comment.comment}
 */
router.post("/", async function(req, res, next) {
	try {
		const feedback = await Comment.postComment(req.body);

		const message = {
			from: process.env.SMTP_FROM,
			to: process.env.SMTP_TO,
			subject: 'Website feedback',
			text: `name: ${feedback.nameFirst + ' ' + feedback.nameLast}\nemail: ${feedback.email}\nfeedback: ${feedback.comment}`	
		};

		mailIt(message);
		return res.json({"msg": "thank you for your feedback!", "feedback": feedback.comment});
	} catch (err) {
		return next(err);
	}
});

/**
 * @description handles request to enter user survey response, sends req to
 *  Comment class to handle the request, returns string confirmation or error
 * @name post/comments/survey
 * @function
 * @param {string} path - /comments/survey
 * @param {callback} middleware - Express middleware.
 * @returns {object} - {msg: "thank you for your feedback"}
 */
router.post("/survey", async function(req, res, next) {

	let colors = Object.keys((req.body).colorScheme).filter((key) => {return (req.body).colorScheme[key]});
	colors = '{' + colors.toString() + '}';
	req.body.colors = colors;

	let fonts = Object.keys((req.body).fontScheme).filter((key) => {return (req.body).fontScheme[key]});
	fonts = '{' + fonts.toString() + '}';
	req.body.fonts = fonts;

	try {
		const result = await Comment.postSurvey(req.body);

		const message = {
			from: process.env.SMTP_FROM,
			to: process.env.SMTP_TO,
			subject: 'Survey has been submitted',
			text: "Coming in hot! survey just dropped..."	
		};

		mailIt(message);
		return res.json({result});
	} catch (err) {
		return next(err);
	}
});

/**
 * @function mailIt
 * @description emails/fwds feedback to specified email address
 * @param {object} feedback - feedback object (name, email, msg)
 * @returns {undefined}
 */
function mailIt(message) {
	const transporter = nodemailer.createTransport({
		host: process.env.SMTP_HOST,
		service: process.env.SMTP_SERVICE,
		port: process.env.SMTP_PORT,
		secure: false,
		auth: {
			user: process.env.SMTP_USER,
			pass: process.env.SMTP_PASS
		}
	});

	transporter.sendMail(message, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
	});
}

exports.commentsRoutes = router;