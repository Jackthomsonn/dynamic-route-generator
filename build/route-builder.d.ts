/// <reference types="express" />
import { IRoute } from './interfaces/IRoute';
import { IRouter } from 'express';
declare class RouteBuilder {
    protected method: string;
    protected route: IRoute;
    protected generatedRoutes: IRouter<any>;
    constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>);
    protected getHandlersForRoute(route: IRoute): Function[];
}
export { RouteBuilder };
