"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const route_builder_1 = require("./route-builder");
class BuildDeleteRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, options) {
        super(method, route, options);
        this.buildDeleteRoute();
    }
    buildDeleteRoute() {
        this.generatedRoutes[this.method](this.route.uri + '/:id', this.setHandlersForRouteMethod(this.route, this.method), (req, res, next) => {
            this.route.model.delete(req.params.id).then(() => {
                res.status(200).send();
            }).catch((err) => {
                if (err && err.message) {
                    next(new exceptions_1.NotFound(err.message));
                }
                else {
                    next(new exceptions_1.NotFound());
                }
            });
        });
    }
}
exports.BuildDeleteRoute = BuildDeleteRoute;
