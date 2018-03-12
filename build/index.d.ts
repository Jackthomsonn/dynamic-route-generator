declare class RouteGenerator {
    private options;
    private event;
    private installedPlugins;
    constructor(options: IRouteGenerator.IOptions);
    private instantiate();
    private appInstanceIsPresent();
    private routesArePresent();
    private installPlugins();
    private notifyPluginInstalled();
}
export { RouteGenerator };
