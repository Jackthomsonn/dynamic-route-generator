import { RouteBuilder } from '../route/route-builder';
declare class BuildPutRoute extends RouteBuilder {
    constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions);
    buildPutRoute(): void;
}
export { BuildPutRoute };
