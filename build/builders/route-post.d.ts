import { RouteBuilder } from './route-builder';
declare class BuildPostRoute extends RouteBuilder {
    constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions);
    buildPostRoute(): void;
}
export { BuildPostRoute };
