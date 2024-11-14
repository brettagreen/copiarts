"use strict";
/**
 * @module /backend/server
 * @requires module:/backend/app
 * @author Brett A. Green <brettalangreen@proton.me>
 * @version 1.0
 * @description imports express app object and sets it to listen on designated port. i.e. hoists the application
 * 
 */

/**
 * express app object
 * @const
 */
const fs = require('fs');
const app = require("./app");
let server;
require("dotenv").config();

/**
 * fetch photos so users don't have to do it on the frontend
 */
const getPhotos = require("./api/instagram/loadInstagramPhotos");

async function loadPhotos() {
    await getPhotos();
}

loadPhotos();


if (process.env.ENVIRONMENT === 'AWS') {
    const https = require('node:https');
    const fs = require('node:fs');

    const privateKey = fs.readFileSync( './certs/privkey.pem' );
    const certificate = fs.readFileSync( './certs/fullchain.pem' );
  
    server = https.createServer({
        key: privateKey,
        cert: certificate
    }, app).listen(process.env.PORT, function () {
        console.log(`Started on ${process.env.COPIARTS_BASE_URL}`);
    });
} else {
    server = app.listen(process.env.PORT, function () {
        console.log(`Started on ${process.env.COPIARTS_BASE_URL}`);
    });
}

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;
