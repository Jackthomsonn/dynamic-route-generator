import { IRoute } from './interfaces/IRoute'
import { IRouter } from 'express';

class RouteBuilder {
  protected method: string
  protected route: IRoute
  protected generatedRoutes: IRouter<any>

  constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>) {
    this.method = method
    this.route = route
    this.generatedRoutes = generatedRoutes
  }

  protected getHandlersForRoute(route: IRoute) {
    if (!route.handlers || route.handlers.length === 0) {
      return []
    }

    return route.handlers
  }
}

export { RouteBuilder }