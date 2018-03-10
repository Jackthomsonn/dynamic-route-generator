declare class RouteGenerator {
    private options;
    constructor(options: IRouteGenerator.IOptions);
    private instantiate();
    private appInstanceIsPresent();
    private routesArePresent();
}
export { RouteGenerator };
