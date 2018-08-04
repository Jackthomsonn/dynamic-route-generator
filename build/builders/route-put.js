"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const route_builder_1 = require("./route-builder");
class BuildPutRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, options) {
        super(method, route, options);
        this.buildPutRoute();
    }
    buildPutRoute() {
        this.generatedRoutes[this.method](this.route.uri + '/:id', this.setHandlersForRouteMethod(this.route, this.method), (req, _res, next) => {
            this.route.model.findOneAndUpdate({ _id: req.params.id }, req.body, { overwrite: true, runValidators: true }).then(() => {
                next();
            }).catch((err) => {
                next(new exceptions_1.NotFound(err.message));
            });
        });
    }
}
exports.BuildPutRoute = BuildPutRoute;
