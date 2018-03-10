"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class RouteBuilder {
    constructor(method, route, generatedRoutes) {
        this.method = method;
        this.route = route;
        this.generatedRoutes = generatedRoutes;
    }
    getHandlersForRoute(route) {
        if (!route.handlers || route.handlers.length === 0) {
            return [];
        }
        return route.handlers;
    }
}
exports.RouteBuilder = RouteBuilder;
