import * as bodyParser from 'body-parser'

import { IOptions } from './interfaces/IOptions'
import { IRoute } from './interfaces/IRoute'
import { IRouter, Router } from 'express'

class RouteBuilder {
  protected method: string
  protected route: IRoute
  protected generatedRoutes: IRouter<any>

  private options: IOptions

  constructor(method: string, route: IRoute, options: IOptions) {
    this.method = method
    this.route = route
    this.options = options
    this.generatedRoutes = Router()

    this.applyGeneratedRoutes()
  }

  protected getHandlersForRoute(route: IRoute) {
    if (!route.handlers || route.handlers.length === 0) {
      return []
    }

    return route.handlers
  }

  private applyGeneratedRoutes() {
    this.options.app.use(bodyParser.json())

    if (this.options.baseUri) {
      this.options.app.use(this.options.baseUri, this.generatedRoutes)
    } else {
      this.options.app.use('/api', this.generatedRoutes)
    }
  }
}

export { RouteBuilder }