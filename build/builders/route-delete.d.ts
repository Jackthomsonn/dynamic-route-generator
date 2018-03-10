/// <reference types="express" />
import { IRoute } from './../interfaces/IRoute';
import { IRouter } from 'express';
import { RouteBuilder } from "../route-builder";
declare class BuildDeleteRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>);
    buildDeleteRoute(): void;
}
export { BuildDeleteRoute };
