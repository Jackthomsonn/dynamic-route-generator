declare class Route {
    private options;
    private route;
    constructor(options: IRouteGenerator.IOptions, route: IRouteGenerator.IRoute);
    create(): void;
    private uriPathIsPresent(route);
    private routeModelIsPresent(route);
}
export { Route };
