import * as bodyParser from 'body-parser'

import { IRouter, Router } from 'express'

class RouteBuilder {
  protected method: string
  protected route: IRouteGenerator.IRoute
  protected generatedRoutes: IRouter<string>
  protected options: IRouteGenerator.IOptions

  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    this.method = method
    this.route = route
    this.options = options
    this.generatedRoutes = Router()

    this.applyGeneratedRoutes()
  }

  protected setHandlersForRouteMethod(route: IRouteGenerator.IRoute, methodName: string) {
    const handlers: Array<any> = []

    if (route.methods && route.methods.length) {
      route.methods.forEach((method: IRouteGenerator.IMethod) => {

        if (!method.handlers) {
          method.handlers = []
        }

        if (method.name === methodName) {
          method.handlers.forEach((handler: any) => {
            if (handler) {
              handlers.push(method.handlers)
            }
          })
        }
      })
    }

    return handlers
  }

  private applyGeneratedRoutes() {
    this.options.app.use(bodyParser.json())

    this.options.app.use(this.options.baseUri, this.generatedRoutes)

  }
}

export { RouteBuilder }