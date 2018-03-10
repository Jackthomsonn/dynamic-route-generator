/// <reference types="express" />
import { IRouter } from 'express';
declare class RouteBuilder {
    protected method: string;
    protected route: IRouteGenerator.IRoute;
    protected generatedRoutes: IRouter<string>;
    protected options: IRouteGenerator.IOptions;
    constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions);
    protected setHandlersForRouteMethod(route: IRouteGenerator.IRoute, methodName: string): any[];
    private applyGeneratedRoutes();
}
export { RouteBuilder };
