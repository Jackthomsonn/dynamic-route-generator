import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from "../route-builder";
import { IOptions } from '../interfaces/IOptions';
declare class BuildPutRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, options: IOptions);
    buildPutRoute(): void;
}
export { BuildPutRoute };
