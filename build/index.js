"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const error_1 = require("./error");
const route_1 = require("./route/route");
class RouteGenerator {
    constructor(options) {
        this.installedPlugins = [];
        this.options = options;
        this.event = new events.EventEmitter();
        this.notifyPluginInstalled();
        this.instantiate();
    }
    instantiate() {
        try {
            if (this.appInstanceIsPresent() && this.routesArePresent()) {
                this.options.routes.forEach(route => new route_1.Route(this.options, route));
            }
            this.installPlugins();
            this.installedPlugins.forEach(plugin => {
                plugin.execute(this);
            });
        }
        catch (error) {
            error_1.ErrorHandler.handleError(error);
        }
    }
    appInstanceIsPresent() {
        if (!this.options.app || typeof this.options.app !== 'function') {
            throw new Error('Your must provide an instance of your application to assign routes to');
        }
        return true;
    }
    routesArePresent() {
        if (!this.options.routes || this.options.routes.length === 0) {
            throw new Error('Your must provide at least one route');
        }
        return true;
    }
    installPlugins() {
        if (this.options.plugins && this.options.plugins.length > 0) {
            this.options.plugins.forEach(plugin => {
                new plugin().install(this.event);
            });
        }
    }
    notifyPluginInstalled() {
        this.event.on('Plugin Installed', (pluginName, plugin) => {
            process.stdout.write(`${pluginName} was installed successfully`);
            this.installedPlugins.push(plugin);
        });
    }
}
exports.RouteGenerator = RouteGenerator;
