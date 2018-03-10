"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const route_delete_1 = require("../builders/route-delete");
const route_post_1 = require("../builders/route-post");
const route_put_1 = require("../builders/route-put");
const route_get_1 = require("../builders/route.get");
const error_1 = require("../error");
class Route {
    constructor(options, route) {
        this.validMethodNames = ['post', 'get', 'put', 'delete'];
        this.options = options;
        this.route = route;
        this.create();
    }
    create() {
        try {
            if (this.uriPathIsPresent(this.route) && this.routeModelIsPresent(this.route)) {
                if (this.route.methods && this.route.methods.length === 0 || !this.route.methods) {
                    new route_get_1.BuildGetRoute('get', this.route, this.options);
                }
                else {
                    this.route.methods.forEach(method => {
                        if (!method.name) {
                            error_1.ErrorHandler.handleError(new Error(`You have not added a name for your method please choose from either ${this.validMethodNames}`));
                        }
                        else if (!this.isMethodNameValid(method)) {
                            error_1.ErrorHandler.handleError(new Error(`You have supplied an invalid method name. Available options are ${this.validMethodNames}`));
                        }
                        switch (method.name) {
                            case 'post':
                                new route_post_1.BuildPostRoute(method.name, this.route, this.options);
                                break;
                            case 'get':
                                new route_get_1.BuildGetRoute(method.name, this.route, this.options);
                                break;
                            case 'put':
                                new route_put_1.BuildPutRoute(method.name, this.route, this.options);
                                break;
                            case 'delete':
                                new route_delete_1.BuildDeleteRoute(method.name, this.route, this.options);
                                break;
                        }
                    });
                }
            }
        }
        catch (error) {
            error_1.ErrorHandler.handleError(error);
        }
    }
    isMethodNameValid(method) {
        return this.validMethodNames.indexOf(method.name) > -1;
    }
    uriPathIsPresent(route) {
        if (!route.uri) {
            throw new Error('Your route needs a uri');
        }
        return true;
    }
    routeModelIsPresent(route) {
        if (!route.model) {
            throw new Error('Your route needs a model');
        }
        return true;
    }
}
exports.Route = Route;
