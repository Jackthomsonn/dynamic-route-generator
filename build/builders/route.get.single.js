"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_builder_1 = require("../route-builder");
class BuildGetSingleRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, generatedRoutes) {
        super(method, route, generatedRoutes);
        this.buildGetSingleRoute();
    }
    buildGetSingleRoute() {
        this.generatedRoutes[this.method](this.route.uri, this.getHandlersForRoute(this.route), (req, res) => {
            console.log('WOo');
            this.route.model.findById(req.params.id).then((document) => {
                res.status(200).send(document);
            }).catch((err) => {
                res.status(400).send({
                    message: err.message
                });
            });
        });
    }
}
exports.BuildGetSingleRoute = BuildGetSingleRoute;
