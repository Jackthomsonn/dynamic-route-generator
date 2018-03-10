import { IOptions } from './../interfaces/IOptions';
import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from '../route-builder';
declare class BuildPostRoute extends RouteBuilder {
    constructor(method: string, route: IRoute, options: IOptions);
    buildPostRoute(): void;
}
export { BuildPostRoute };
