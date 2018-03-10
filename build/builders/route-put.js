"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_builder_1 = require("../route/route-builder");
class BuildPutRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, options) {
        super(method, route, options);
        this.buildPutRoute();
    }
    buildPutRoute() {
        this.generatedRoutes[this.method](this.route.uri + '/:id', this.getHandlersForRoute(this.route, this.method), (req, res) => {
            this.route.model.findOneAndUpdate({ _id: req.params.id }, req.body, { overwrite: true, runValidators: true }).then(() => {
                res.status(200).send({
                    message: 'Document updated'
                });
            }).catch((err) => {
                res.status(404).send({
                    message: err.message
                });
            });
        });
    }
}
exports.BuildPutRoute = BuildPutRoute;
