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
        if (this.options.plugins.length) {
            this.options.plugins.forEach(plugin => { plugin.install(this.event); });
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
