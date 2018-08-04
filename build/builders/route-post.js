"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const route_builder_1 = require("./route-builder");
class BuildPostRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, options) {
        super(method, route, options);
        this.buildPostRoute();
    }
    buildPostRoute() {
        this.generatedRoutes[this.method](this.route.uri, this.setHandlersForRouteMethod(this.route, this.method), (req, res, next) => {
            this.route.model.create(req.body).then(() => {
                res.status(200).send();
            }).catch((err) => {
                next(new exceptions_1.BadRequest(err.message));
            });
        });
    }
}
exports.BuildPostRoute = BuildPostRoute;
