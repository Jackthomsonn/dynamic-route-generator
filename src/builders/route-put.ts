
import { NextFunction, Request, Response } from 'express'
import { NotFound } from '../exceptions';
import { RouteBuilder } from './route-builder'

class BuildPutRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildPutRoute()
  }

  public buildPutRoute() {
    (this.generatedRoutes as any)[this.method](this.route.uri + '/:id', this.setHandlersForRouteMethod(this.route, this.method), (req: Request, res: Response, next: NextFunction) => {
      this.route.model.update(req.params.id, req.body, { overwrite: true, runValidators: true }).then(() => {
        res.status(200).send()
      }).catch((err: Error) => {
        if (err && err.message) {
          next(new NotFound(err.message))
        } else {
          next(new NotFound())
        }
      })
    })
  }
}

export { BuildPutRoute }