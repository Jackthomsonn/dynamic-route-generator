declare class Route {
    private options;
    private route;
    private validMethodNames;
    constructor(options: IRouteGenerator.IOptions, route: IRouteGenerator.IRoute);
    create(): void;
    private handleStringLiteralMethodNames(method);
    private methodNameIsPresent(method);
    private methodNameIsValid(method);
    private routeMethodsAreAvailable();
    private uriPathIsPresent(route);
    private routeModelIsPresent(route);
}
export { Route };
