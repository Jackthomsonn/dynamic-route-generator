import { ErrorHandler } from './error'
import { Route } from './route/route'

class RouteGenerator {
  private options: IRouteGenerator.IOptions

  constructor(options: IRouteGenerator.IOptions) {
    this.options = options
    this.instantiate()
  }

  private instantiate() {
    try {
      if (this.appInstanceIsPresent() && this.routesArePresent()) {
        this.options.routes.forEach(route => new Route(this.options, route))
      }
    } catch (error) {
      ErrorHandler.handleError(error)
    }
  }

  private appInstanceIsPresent() {
    if (!this.options.app || typeof this.options.app !== 'function') {
      throw new Error('Your must provide an instance of your application to assign routes to')
    }

    return true
  }

  private routesArePresent() {
    if (!this.options.routes || this.options.routes.length === 0) {
      throw new Error('Your must provide at least one route')
    }

    return true
  }
}

export { RouteGenerator }