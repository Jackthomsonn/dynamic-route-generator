import { Router, IRouter } from 'express'
import * as bodyParser from 'body-parser'
import chalk from 'chalk'

import { IOptions } from './interfaces/IOptions'
import { IRoute } from './interfaces/IRoute'
import { BuildPostRoute } from './builders/route-post'
import { BuildGetRoute } from './builders/route.get'
import { BuildPutRoute } from './builders/route-put'
import { BuildDeleteRoute } from './builders/route-delete'

class RouteGenerator {
  private options: IOptions
  private generatedRoutes: IRouter<any>

  constructor(options: IOptions) {
    this.options = options
    this.generatedRoutes = Router()
    this.instantiate()
  }

  private instantiate() {
    try {
      if (this.appInstanceIsPresent() && this.routesArePresent()) {
        this.setDefaults()

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

  private setDefaults() {
    this.options.app.use(bodyParser.json())
    this.setBaseUri()
  }

  private setBaseUri() {
    if (this.options.baseUri) {
      this.options.app.use(this.options.baseUri, this.generatedRoutes)
    } else {
      this.options.app.use('/api', this.generatedRoutes)
    }
  }

  private createRoute(route: IRoute) {
    try {
      if (this.uriPathIsPresent(route) && this.routeModelIsPresent(route)) {
        if (route.methods && route.methods.length === 0 || !route.methods) {
          new BuildGetRoute('get', route, this.generatedRoutes)
        } else {
          route.methods.forEach((method: string) => {
            switch (method) {
              case 'post':
                new BuildPostRoute(method, route, this.generatedRoutes)
                break
              case 'get':
                new BuildGetRoute(method, route, this.generatedRoutes)
                break
              case 'put':
                new BuildPutRoute(method, route, this.generatedRoutes)
                break
              case 'delete':
                new BuildDeleteRoute(method, route, this.generatedRoutes)
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