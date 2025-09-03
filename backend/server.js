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

await authAndGetPhotos();

setTimeout(async () => {
    console.log('getting to setTimeout')
    clearPhotos();
    await authAndGetPhotos();
}, 50000000)

server = app.listen(process.env.PORT, function () {
    console.log(`Started on ${process.env.COPIARTS_BASE_URL}`);
});

server.keepAliveTimeout = 30 * 1000;
server.headersTimeout = 35 * 1000;
