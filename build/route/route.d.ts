declare class Route {
    private options;
    private route;
    private validMethodNames;
    constructor(options: IRouteGenerator.IOptions, route: IRouteGenerator.IRoute);
    create(): void;
    private determineDatabaseTypeToUse;
    private handleStringLiteralMethodNames;
    private methodNameIsPresent;
    private methodNameIsValid;
    private routeMethodsAreAvailable;
    private uriPathIsPresent;
    private routeModelIsPresent;
}
export { Route };
