
import { NextFunction, Request, Response } from 'express'
import { NotFound } from '../exceptions';
import { RouteBuilder } from './route-builder'

class BuildPutRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildPutRoute()
  }

  public buildPutRoute() {
    (this.generatedRoutes as any)[this.method](this.route.uri + '/:id', this.setHandlersForRouteMethod(this.route, this.method), (req: Request, _res: Response, next: NextFunction) => {
      this.route.model.findOneAndUpdate({ _id: req.params.id }, req.body, { overwrite: true, runValidators: true }).then(() => {
        next()
      }).catch((err: Error) => {
        next(new NotFound(err.message))
      })
    })
  }
}

export { BuildPutRoute }