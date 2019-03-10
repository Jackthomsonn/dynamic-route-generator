"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const error_1 = require("./error");
const exceptions_1 = require("./exceptions");
const plugin_support_1 = require("./plugin-support");
const route_1 = require("./route/route");
class RouteGenerator {
    constructor(options) {
        this.event = new events.EventEmitter();
        this.options = Object.assign({ app: undefined, baseUri: '/', database: options.database || 'mongo', plugins: [], routes: [] }, options);
        this.instantiate();
    }
    instantiate() {
        try {
            new plugin_support_1.PluginSupport(this.options, this.event);
            if (this.appInstanceIsPresent() && this.routesArePresent()) {
                this.options.routes.forEach(route => new route_1.Route(this.options, route));
            }
            this.event.emit('post-plugins');
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
        if (!this.options.routes) {
            throw new Error('You must provide a route property');
        }
        return true;
    }
}
module.exports = {
    BadRequest: exceptions_1.BadRequest,
    Forbidden: exceptions_1.Forbidden,
    InternalServerError: exceptions_1.InternalServerError,
    NotFound: exceptions_1.NotFound,
    RouteGenerator,
    Unauthorized: exceptions_1.Unauthorized
};
