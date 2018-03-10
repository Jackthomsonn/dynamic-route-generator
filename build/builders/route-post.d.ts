/// <reference types="express" />
import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from '../route-builder';
import { IRouter } from 'express';
declare class BuildPostRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>);
    buildPostRoute(): void;
}
export { BuildPostRoute };
