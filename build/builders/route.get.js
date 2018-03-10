"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_builder_1 = require("../route-builder");
class BuildGetRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, generatedRoutes) {
        super(method, route, generatedRoutes);
        this.buildGetRoute();
    }
    buildGetRoute() {
        this.generatedRoutes[this.method]([this.route.uri, this.route.uri + '/:id'], this.getHandlersForRoute(this.route), (req, res) => {
            if (req.params && req.params.id) {
                this.route.model.findById(req.params.id).then((document) => {
                    res.status(200).send(document);
                }).catch((err) => {
                    res.status(400).send({
                        message: err.message
                    });
                });
            }
            else {
                this.route.model.find({}, (err, documents) => {
                    if (err) {
                        res.status(400).send({
                            message: err.message
                        });
                    }
                    res.status(200).send(documents);
                });
            }
        });
    }
}
exports.BuildGetRoute = BuildGetRoute;
