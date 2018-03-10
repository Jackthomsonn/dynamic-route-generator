declare class Route {
    private options;
    private route;
    private validMethodNames;
    constructor(options: IRouteGenerator.IOptions, route: IRouteGenerator.IRoute);
    create(): void;
    private isMethodNameValid(method);
    private uriPathIsPresent(route);
    private routeModelIsPresent(route);
}
export { Route };
