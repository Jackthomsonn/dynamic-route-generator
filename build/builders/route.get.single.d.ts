/// <reference types="express" />
import { IRouter } from 'express';
import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from "../route-builder";
declare class BuildGetSingleRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>);
    buildGetSingleRoute(): void;
}
export { BuildGetSingleRoute };
