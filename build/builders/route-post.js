"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_builder_1 = require("../route/route-builder");
class BuildPostRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, options) {
        super(method, route, options);
        this.buildPostRoute();
    }
    buildPostRoute() {
        this.generatedRoutes[this.method](this.route.uri, this.getHandlersForRoute(this.route, this.method), (req, res) => {
            this.route.model.create(req.body).then(() => {
                res.status(200).send({
                    message: 'Document created'
                });
            }).catch((err) => {
                res.status(400).send({
                    message: err.message
                });
            });
        });
    }
}
exports.BuildPostRoute = BuildPostRoute;
