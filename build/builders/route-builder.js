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
    setHandlersForRouteMethod(route, methodName) {
        const handlers = [];
        if (route.methods && route.methods.length) {
            route.methods.forEach((method) => {
                if (!method.handlers) {
                    method.handlers = [];
                }
                if (method.name === methodName) {
                    method.handlers.forEach((handler) => {
                        if (handler) {
                            handlers.push(method.handlers);
                        }
                    });
                }
            });
        }
        return handlers;
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
