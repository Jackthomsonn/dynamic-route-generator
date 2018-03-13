"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events = require("events");
class PluginSupport {
    constructor(options) {
        this.options = options;
        this.event = new events.EventEmitter();
        this.installPlugins();
    }
    installPlugins() {
        this.notifyPluginInstalled();
        if (this.options.plugins.length > 0) {
            this.options.plugins.forEach(plugin => {
                plugin.install(this.event);
            });
        }
    }
    notifyPluginInstalled() {
        this.event.on('Plugin Installed', (pluginInformation, plugin) => {
            process.stdout.write(`${pluginInformation.name} was installed successfully`);
            this.instantiatePlugin(plugin);
        });
    }
    instantiatePlugin(plugin) {
        plugin.apply(this.options);
    }
}
exports.PluginSupport = PluginSupport;
