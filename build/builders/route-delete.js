"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_builder_1 = require("../route-builder");
class BuildDeleteRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, options) {
        super(method, route, options);
        this.buildDeleteRoute();
    }
    buildDeleteRoute() {
        this.generatedRoutes[this.method](this.route.uri + '/:id', this.getHandlersForRoute(this.route), (req, res) => {
            this.route.model.remove({ _id: req.params.id }).then(() => {
                res.status(200).send({
                    message: 'Document removed'
                });
            }).catch((err) => {
                res.status(404).send({
                    message: err.message
                });
            });
        });
    }
}
exports.BuildDeleteRoute = BuildDeleteRoute;
