"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
const error_1 = require("./error");
class PluginSupport {
    constructor(options) {
        this.options = options;
        this.event = new events.EventEmitter();
        this.installPlugins();
    }
    installPlugins() {
        this.notifyPluginInstalled();
        if (this.options.plugins.length) {
            this.options.plugins.forEach(plugin => {
                try {
                    plugin.install(this.event);
                }
                catch (error) {
                    error_1.ErrorHandler.handleError(new Error(`An error occurred in ${plugin.name}: ${error.stack}`));
                }
            });
        }
    }
    notifyPluginInstalled() {
        this.event.on('Plugin Installed', (plugin) => {
            this.instantiatePlugin(new plugin());
        });
    }
    instantiatePlugin(plugin) {
        plugin.apply(this.options);
    }
}
exports.PluginSupport = PluginSupport;
