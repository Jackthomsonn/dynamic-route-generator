"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const error_1 = require("./error");
class PluginSupport {
    constructor(options, event) {
        this.options = options;
        this.event = event;
        this.installPlugins();
    }
    installPlugins() {
        this.notifyPluginInstalled();
        if (this.options.plugins.pre && this.options.plugins.pre.length) {
            this.options.plugins.pre.forEach(plugin => {
                try {
                    if (plugin) {
                        plugin.install(this.event);
                    }
                }
                catch (error) {
                    error_1.ErrorHandler.handleError(new Error(`An error occurred in ${plugin.name}: ${error.stack}`));
                }
            });
        }
        this.event.on('post-plugins', () => {
            if (this.options.plugins.post && this.options.plugins.post.length) {
                this.options.plugins.post.forEach(plugin => {
                    try {
                        if (plugin) {
                            plugin.install(this.event);
                        }
                    }
                    catch (error) {
                        error_1.ErrorHandler.handleError(new Error(`An error occurred in ${plugin.name}: ${error.stack}`));
                    }
                });
            }
        });
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
