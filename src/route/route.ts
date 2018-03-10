import { BuildDeleteRoute } from '../builders/route-delete'
import { BuildPostRoute } from '../builders/route-post'
import { BuildPutRoute } from '../builders/route-put'
import { BuildGetRoute } from '../builders/route.get'
import { ErrorHandler } from '../error'

class Route {
  private options: IRouteGenerator.IOptions
  private route: IRouteGenerator.IRoute
  private validMethodNames: Array<string> = ['post', 'get', 'put', 'delete']

  constructor(options: IRouteGenerator.IOptions, route: IRouteGenerator.IRoute) {
    this.options = options
    this.route = route

    this.create()
  }

  public create() {
    try {
      if (this.uriPathIsPresent(this.route) && this.routeModelIsPresent(this.route)) {
        if (this.route.methods && this.route.methods.length === 0 || !this.route.methods) {
          new BuildGetRoute('get', this.route, this.options)
        } else {
          this.route.methods.forEach(method => {
            if (!method.name) {
              ErrorHandler.handleError(
                new Error(`You have not added a name for your method please choose from either ${this.validMethodNames}`)
              )
            } else if (!this.isMethodNameValid(method)) {
              ErrorHandler.handleError(
                new Error(`You have supplied an invalid method name. Available options are ${this.validMethodNames}`)
              )
            }

            switch (method.name) {
              case 'post':
                new BuildPostRoute(method.name, this.route, this.options)
                break
              case 'get':
                new BuildGetRoute(method.name, this.route, this.options)
                break
              case 'put':
                new BuildPutRoute(method.name, this.route, this.options)
                break
              case 'delete':
                new BuildDeleteRoute(method.name, this.route, this.options)
                break
            }
          })
        }
      }
    } catch (error) {
      ErrorHandler.handleError(error)
    }
  }

  private isMethodNameValid(method: IRouteGenerator.IMethod) {
    return this.validMethodNames.indexOf(method.name) > -1
  }

  private uriPathIsPresent(route: IRouteGenerator.IRoute) {
    if (!route.uri) {
      throw new Error('Your route needs a uri')
    }

    return true
  }

  private routeModelIsPresent(route: IRouteGenerator.IRoute) {
    if (!route.model) {
      throw new Error('Your route needs a model')
    }

    return true
  }
}

export { Route }