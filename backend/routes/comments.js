const express = require("express");
const router = express.Router();
const Comment = require("../models/comment");
const nodemailer = require("nodemailer");

router.get("/", async function(req, res, next) {
    try {
       const comments = await Comment.fetchComments();
	   return res.json({comments});
    } catch (err) {
        return next(err);
    }
});

router.post("/", async function(req, res, next) {
	try {
		const feedback = await Comment.postComment(req.body);
		console.log("FEEDBACK", feedback);
		mailIt(feedback);
		return res.json({"msg": "thank you for your feedback!", "feedback": feedback.comment});
	} catch (err) {
		return next(err);
	}
});

function mailIt(feedback) {
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

	const message = {
		from: process.env.SMTP_FROM,
		to: process.env.SMTP_TO,
		subject: 'Website feedback',
		text: `name: ${feedback.nameFirst + ' ' + feedback.nameLast}\nemail: ${feedback.email}\nfeedback: ${feedback.comment}`	
	};

	transporter.sendMail(message, (error, info) => {
		if (error) {
			return console.log(error);
		}
		console.log('Message sent: %s', info.messageId);
	});
}

exports.commentsRoutes = router;