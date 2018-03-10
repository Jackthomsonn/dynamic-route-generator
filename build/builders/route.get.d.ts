import { RouteBuilder } from '../route/route-builder';
declare class BuildGetRoute extends RouteBuilder {
    constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions);
    buildGetRoute(): void;
}
export { BuildGetRoute };
