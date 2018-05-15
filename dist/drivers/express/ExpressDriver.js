"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var bodyParser = require("body-parser");
var drivers_1 = require("../drivers");
var http = require("http");
var logger = require("morgan");
var cors = require("cors");
var ExpressDriver = /** @class */ (function () {
    function ExpressDriver() {
    }
    ExpressDriver.start = function (dataStore) {
        // configure app to use bodyParser()
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
        // Setup route logger
        this.app.use(logger('dev'));
        this.app.use(cors({ origin: true, credentials: true }));
        // Set our api routes
        this.app.use('/', drivers_1.ExpressRouteDriver.buildRouter(dataStore));
        /**
         * Get port from environment and store in Express.
         */
        var port = process.env.PORT || '3000';
        this.app.set('port', port);
        /**
         * Create HTTP server.
         */
        var server = http.createServer(this.app);
        /**
         * Listen on provided port, on all network interfaces.
         */
        server.listen(port, function () {
            return console.log("Gordon's Kitchen API running on localhost:" + port);
        });
        return this.app;
    };
    ExpressDriver.app = express();
    return ExpressDriver;
}());
exports.ExpressDriver = ExpressDriver;
