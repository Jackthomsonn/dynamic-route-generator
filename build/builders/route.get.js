"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
const route_builder_1 = require("./route-builder");
class BuildGetRoute extends route_builder_1.RouteBuilder {
    constructor(method, route, options) {
        super(method, route, options);
        this.buildGetRoute();
    }
    buildGetRoute() {
        this.generatedRoutes[this.method]([this.route.uri, this.route.uri + '/:id'], this.setHandlersForRouteMethod(this.route, 'get'), (req, res, next) => {
            if (req.params && req.params.id) {
                this.route.model.findById(req.params.id).then((document) => {
                    res.status(200).send(document);
                }).catch((err) => {
                    next(new exceptions_1.NotFound(err.message));
                });
            }
            else {
                this.route.model.find({}, (err, documents) => {
                    if (err) {
                        next(new exceptions_1.NotFound(err.message));
                    }
                    res.status(200).send(documents);
                });
            }
        });
    }
}
exports.BuildGetRoute = BuildGetRoute;
