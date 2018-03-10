import chalk from 'chalk'

import { IOptions } from './interfaces/IOptions'
import { IRoute } from './interfaces/IRoute'
import { BuildPostRoute } from './builders/route-post'
import { BuildGetRoute } from './builders/route.get'
import { BuildPutRoute } from './builders/route-put'
import { BuildDeleteRoute } from './builders/route-delete'

class RouteGenerator {
  private options: IOptions

  constructor(options: IOptions) {
    this.options = options
    this.instantiate()
  }

  private instantiate() {
    try {
      if (this.appInstanceIsPresent() && this.routesArePresent()) {
        this.options.routes.forEach(route => this.createRoute(route))
      }
    } catch (error) {
      this.errorHandler(error)
    }
  }

  private uriPathIsPresent(route: IRoute) {
    if (!route.uri) {
      throw ('Your route needs a uri')
    }

    return true
  }

  private routeModelIsPresent(route: IRoute) {
    if (!route.model) {
      throw ('Your route needs a model')
    }

    return true
  }

  private appInstanceIsPresent() {
    if (!this.options.app || typeof this.options.app !== 'function') {
      throw ('Your must provide an instance of your application to assign routes to')
    }

    return true
  }

  private routesArePresent() {
    if (!this.options.routes || this.options.routes.length === 0) {
      throw ('Your must provide at least one route')
    }

    return true
  }

  private createRoute(route: IRoute) {
    try {
      if (this.uriPathIsPresent(route) && this.routeModelIsPresent(route)) {
        if (route.methods && route.methods.length === 0 || !route.methods) {
          new BuildGetRoute('get', route, this.options)
        } else {
          route.methods.forEach((method: string) => {
            switch (method) {
              case 'post':
                new BuildPostRoute(method, route, this.options)
                break
              case 'get':
                new BuildGetRoute(method, route, this.options)
                break
              case 'put':
                new BuildPutRoute(method, route, this.options)
                break
              case 'delete':
                new BuildDeleteRoute(method, route, this.options)
                break
            }
          })
        }
      }
    } catch (error) {
      this.errorHandler(error)
    }
  }

  private errorHandler(message: string) {
    console.log(chalk.bold.magentaBright('Dynamic Route Creation Plugin Error: ') + chalk.italic.blue(message))
  }
}

export { RouteGenerator }