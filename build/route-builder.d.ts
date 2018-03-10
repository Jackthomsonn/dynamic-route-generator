/// <reference types="express" />
import { IOptions } from './interfaces/IOptions';
import { IRoute } from './interfaces/IRoute';
import { IRouter } from 'express';
declare class RouteBuilder {
    protected method: string;
    protected route: IRoute;
    protected generatedRoutes: IRouter<any>;
    private options;
    constructor(method: string, route: IRoute, options: IOptions);
    protected getHandlersForRoute(route: IRoute): Function[];
    private applyGeneratedRoutes();
}
export { RouteBuilder };
