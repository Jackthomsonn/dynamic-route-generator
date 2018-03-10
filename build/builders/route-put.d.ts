/// <reference types="express" />
import { IRouter } from 'express';
import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from "../route-builder";
declare class BuildPutRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>);
    buildPutRoute(): void;
}
export { BuildPutRoute };
