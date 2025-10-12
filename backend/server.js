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
//const app = require("./app");
import app from './app.js';
let server;
import 'dotenv/config';
import { authAndGetPhotos } from "./api/instagram/loadInstagramPhotos.js";
import { clearPhotos } from "./api/instagram/loadInstagramPhotos.js";

/**
 * @description use instagram API to fetch photos and host for retrieval
 * @name authAndGetPhotos
 * @function 
 * @returns {null}
 */
await authAndGetPhotos();

/**
 * @description periodically (re-)pulls photos from instagram to
 * ensure gallery is up to date
 * @name setTimeout
 * @function 
 * @param {callback} function - clear current hosted photos, retrieve new ones
 * @returns {null}
 */

setTimeout(async () => {
    console.log('getting to setTimeout')
    clearPhotos();
    await authAndGetPhotos();
}, 3600000)

server = app.listen(process.env.PORT, function () {
    console.log(`Started on ${process.env.COPIARTS_BASE_URL}`);
});

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;
