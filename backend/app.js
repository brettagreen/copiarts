"use strict";
/**
 * @module /backend/app
 * @requires module:express
 * @requires module:cors
 * @requires module:helmet
 * @requires module:/backend/expressError.NotFoundError
 * @requires module:morgan
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description Copiarts app dependencies, error handling, and other middleware
 * 
 */

/**
 * express module
 * @const
 */
const express = require("express");
/**
 * security: cross-origin requests module
 * @const
 */
const cors = require("cors");
/**
 * security: helmet module
 * @const
 */
const helmet = require("helmet");

const { NotFoundError } = require("./expressError");

/**
 * /backend/routes/articles module
 * @const
 */
const { eventsRoutes } = require("./routes/events");
const { photosRoutes } = require("./routes/photos");
const { commentsRoutes } = require("./routes/comments");
const { adminRoutes } = require("./routes/admin");

/**
 * logging middleware
 * @const
 */
const morgan = require("morgan");

/**
 * express app object
 * @const
 */
const app = express();

/**
 * associate middleware with app object
 */
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("tiny"));

app.use("/events", eventsRoutes);
app.use("/photos", photosRoutes);
app.use("/comments", commentsRoutes);
app.use("/admin", adminRoutes);

/** Handle 404 errors -- this matches everything */
app.use(function (req, res, next) {
    return next(new NotFoundError());
});

/** Generic error handler; anything unhandled goes here. */
app.use(function (err, req, res, next) {
    if (process.env.NODE_ENV !== "test") console.error(err.stack);
    const status = err.status || 500;
    const message = err.message;

    return res.status(status).json({ error: { message, status }});
});

/**
 * imported by /backend/server module
 */
module.exports = app;
