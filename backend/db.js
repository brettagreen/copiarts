/**
 * database client class
 * @const
 */
const { Client } = require("pg");

class db {

    static dbURI;

    static getClient() {
        /**
         * database client object
         * @const 
         * @type {Object}
         */
        let dbClient;

        if (!this.dbURI) {
            this.dbURI = function getDatabaseUri() {
                const env = process.env.NODE_ENV;
                if (env === "test") {
                    return "copiarts_test"
                } else if (env === "testing") {
                    return "copiarts_testing"
                } else { //production
                    return "copiarts"
                }
            }();
        }

        let connectionObject = {
            database: this.dbURI
        };

        if (process.env.ENVIRONMENT != "local") { //if DB_HOST has a value, then so do all the other process.env.DB... values
            connectionObject.host = process.env.DB_HOST;
            connectionObject.port = process.env.DB_PORT;
            connectionObject.user = process.env.DB_USER;
            connectionObject.password = process.env.DB_PW;
            connectionObject.ssl = {
                rejectUnauthorized: false
            }
        }

        dbClient = new Client(
            connectionObject
        );

	dbClient.connect();
        return dbClient;
    }
}

module.exports = db;
