/// <reference types="node" />
import * as events from 'events';
declare class PluginSupport {
    private options;
    private event;
    constructor(options: IRouteGenerator.IOptions, event: events.EventEmitter);
    private installPlugins();
    private notifyPluginInstalled();
    private instantiatePlugin(plugin);
}
export { PluginSupport };
