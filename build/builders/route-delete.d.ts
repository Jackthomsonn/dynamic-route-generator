import { RouteBuilder } from './route-builder';
declare class BuildDeleteRoute extends RouteBuilder {
    constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions);
    buildDeleteRoute(): void;
}
export { BuildDeleteRoute };
