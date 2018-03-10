"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const bodyParser = require("body-parser");
const chalk_1 = require("chalk");
const route_post_1 = require("./builders/route-post");
const route_get_1 = require("./builders/route.get");
const route_put_1 = require("./builders/route-put");
const route_delete_1 = require("./builders/route-delete");
class RouteGenerator {
    constructor(options) {
        this.options = options;
        this.generatedRoutes = express_1.Router();
        this.instantiate();
    }
    instantiate() {
        try {
            if (this.appInstanceIsPresent() && this.routesArePresent()) {
                this.setDefaults();
                this.options.routes.forEach(route => this.createRoute(route));
            }
        }
        catch (error) {
            this.errorHandler(error);
        }
    }
    uriPathIsPresent(route) {
        if (!route.uri) {
            throw ('Your route needs a uri');
        }
        return true;
    }
    routeModelIsPresent(route) {
        if (!route.model) {
            throw ('Your route needs a model');
        }
        return true;
    }
    appInstanceIsPresent() {
        if (!this.options.app || typeof this.options.app !== 'function') {
            throw ('Your must provide an instance of your application to assign routes to');
        }
        return true;
    }
    routesArePresent() {
        if (!this.options.routes || this.options.routes.length === 0) {
            throw ('Your must provide at least one route');
        }
        return true;
    }
    setDefaults() {
        this.options.app.use(bodyParser.json());
        this.setBaseUri();
    }
    setBaseUri() {
        if (this.options.baseUri) {
            this.options.app.use(this.options.baseUri, this.generatedRoutes);
        }
        else {
            this.options.app.use('/api', this.generatedRoutes);
        }
    }
    createRoute(route) {
        try {
            if (this.uriPathIsPresent(route) && this.routeModelIsPresent(route)) {
                if (route.methods && route.methods.length === 0 || !route.methods) {
                    new route_get_1.BuildGetRoute('get', route, this.generatedRoutes);
                }
                else {
                    route.methods.forEach((method) => {
                        switch (method) {
                            case 'post':
                                new route_post_1.BuildPostRoute(method, route, this.generatedRoutes);
                                break;
                            case 'get':
                                new route_get_1.BuildGetRoute(method, route, this.generatedRoutes);
                                break;
                            case 'put':
                                new route_put_1.BuildPutRoute(method, route, this.generatedRoutes);
                                break;
                            case 'delete':
                                new route_delete_1.BuildDeleteRoute(method, route, this.generatedRoutes);
                                break;
                        }
                    });
                }
            }
        }
        catch (error) {
            this.errorHandler(error);
        }
    }
    errorHandler(message) {
        console.log(chalk_1.default.bold.magentaBright('Dynamic Route Creation Plugin Error: ') + chalk_1.default.italic.blue(message));
    }
}
exports.RouteGenerator = RouteGenerator;
