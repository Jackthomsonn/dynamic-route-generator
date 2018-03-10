import { IOptions } from './interfaces/IOptions';
declare class RouteGenerator {
    private options;
    constructor(options: IOptions);
    private instantiate();
    private uriPathIsPresent(route);
    private routeModelIsPresent(route);
    private appInstanceIsPresent();
    private routesArePresent();
    private createRoute(route);
    private errorHandler(message);
}
export { RouteGenerator };
