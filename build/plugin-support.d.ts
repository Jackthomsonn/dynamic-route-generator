declare class PluginSupport {
    private options;
    private event;
    constructor(options: IRouteGenerator.IOptions);
    private installPlugins();
    private notifyPluginInstalled();
    private instantiatePlugin(plugin);
}
export { PluginSupport };
