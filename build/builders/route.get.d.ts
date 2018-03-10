import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from "../route-builder";
import { IOptions } from '../interfaces/IOptions';
declare class BuildGetRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, options: IOptions);
    buildGetRoute(): void;
}
export { BuildGetRoute };
