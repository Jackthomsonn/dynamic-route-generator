"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express_1 = require("express");
class RouteBuilder {
    constructor(method, route, options) {
        this.method = method;
        this.route = route;
        this.options = options;
        this.generatedRoutes = express_1.Router();
        this.applyGeneratedRoutes();
    }
    getHandlersForRoute(route) {
        if (!route.handlers || route.handlers.length === 0) {
            return [];
        }
        return route.handlers;
    }
    applyGeneratedRoutes() {
        this.options.app.use(bodyParser.json());
        if (this.options.baseUri) {
            this.options.app.use(this.options.baseUri, this.generatedRoutes);
        }
        else {
            this.options.app.use('/api', this.generatedRoutes);
        }
    }
}
exports.RouteBuilder = RouteBuilder;
