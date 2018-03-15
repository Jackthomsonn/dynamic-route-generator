"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
const plugin_support_1 = require("./plugin-support");
const route_1 = require("./route/route");
class RouteGenerator {
    constructor(options) {
        this.options = Object.assign({ app: undefined, baseUri: '/api', plugins: [], routes: [] }, options);
        this.instantiate();
    }
    instantiate() {
        try {
            if (this.appInstanceIsPresent() && this.routesArePresent()) {
                this.options.routes.forEach(route => new route_1.Route(this.options, route));
            }
            new plugin_support_1.PluginSupport(this.options);
        }
        catch (error) {
            error_1.ErrorHandler.handleError(error);
        }
    }
    appInstanceIsPresent() {
        if (!this.options.app || typeof this.options.app !== 'function') {
            throw new Error('Your must provide an instance of your application to assign routes to');
        }
        return true;
    }
    routesArePresent() {
        if (this.options.routes.length === 0) {
            throw new Error('Your must provide at least one route');
        }
        return true;
    }
}
exports.RouteGenerator = RouteGenerator;
