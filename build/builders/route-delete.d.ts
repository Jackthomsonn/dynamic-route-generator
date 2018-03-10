import { IOptions } from './../interfaces/IOptions';
import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from "../route-builder";
declare class BuildDeleteRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, options: IOptions);
    buildDeleteRoute(): void;
}
export { BuildDeleteRoute };
