import * as events from 'events'
import { ErrorHandler } from './error'
import { PluginSupport } from './plugin-support';
import { Route } from './route/route'

class RouteGenerator {
  private options: IRouteGenerator.IOptions
  private event: events.EventEmitter

  constructor(options: IRouteGenerator.IOptions) {
    this.event = new events.EventEmitter()
    this.options = {
      app: undefined,
      baseUri: '/',
      plugins: [],
      routes: [], ...options
    }

    this.instantiate()
  }

  private instantiate() {
    try {
      new PluginSupport(this.options, this.event)

      if (this.appInstanceIsPresent() && this.routesArePresent()) {
        this.options.routes.forEach(route => new Route(this.options, route))
      }

      this.event.emit('post-plugins')

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
    if (!this.options.routes) {
      throw new Error('You must provide a route property')
    }

    return true
  }
}

module.exports = RouteGenerator