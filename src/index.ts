import * as events from 'events'
import { ErrorHandler } from './error'
import { Route } from './route/route'

class RouteGenerator {
  private options: IRouteGenerator.IOptions
  private event: events.EventEmitter
  private installedPlugins: Array<any> = []

  constructor(options: IRouteGenerator.IOptions) {
    this.options = options
    this.event = new events.EventEmitter()
    this.notifyPluginInstalled()
    this.instantiate()
  }

  private instantiate() {
    try {
      if (this.appInstanceIsPresent() && this.routesArePresent()) {
        this.options.routes.forEach(route => new Route(this.options, route))
      }

      this.installPlugins()

      this.installedPlugins.forEach(plugin => {
        plugin.execute(this)
      })
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

  private installPlugins() {
    if (this.options.plugins && this.options.plugins.length > 0) {
      this.options.plugins.forEach(plugin => {
        new plugin().install(this.event)
      })
    }
  }

  private notifyPluginInstalled() {
    this.event.on('Plugin Installed', (pluginName: string, plugin: any) => {
      process.stdout.write(`${pluginName} was installed successfully`)
      this.installedPlugins.push(plugin)
    })
  }
}

export { RouteGenerator }