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
                if (this.routeMethodsAreAvailable()) {
                    this.route.methods.forEach(method => {
                        if (!method.name) {
                            method = this.handleStringLiteralMethodNames(method);
                        }
                        if (this.methodNameIsPresent(method) && this.methodNameIsValid(method)) {
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
                        }
                    });
                }
                else {
                    new route_get_1.BuildGetRoute('get', this.route, this.options);
                }
            }
        }
        catch (error) {
            error_1.ErrorHandler.handleError(error);
        }
    }
    handleStringLiteralMethodNames(method) {
        return JSON.parse('{"name": "' + method + '", "handlers": "[]"}');
    }
    methodNameIsPresent(method) {
        if (!method.name) {
            throw new Error(`You must supply a method name. Available options are ${this.validMethodNames}`);
        }
        return true;
    }
    methodNameIsValid(method) {
        if (!(this.validMethodNames.indexOf(method.name) > -1)) {
            throw new Error(`You must supply a valid method name. Available options are ${this.validMethodNames}`);
        }
        return true;
    }
    routeMethodsAreAvailable() {
        return this.route.methods && this.route.methods.length > 0;
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
