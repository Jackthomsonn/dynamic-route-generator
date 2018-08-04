import { NextFunction, Request, Response } from 'express'
import { BadRequest } from '../exceptions'
import { RouteBuilder } from './route-builder'

class BuildPostRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildPostRoute()
  }

  public buildPostRoute() {
    (this.generatedRoutes as any)[this.method](this.route.uri, this.setHandlersForRouteMethod(this.route, this.method), (req: Request, res: Response, next: NextFunction) => {
      this.route.model.create(req.body).then(() => {
        res.status(200).send()
      }).catch((err: Error) => {
        next(new BadRequest(err.message))
      })
    })
  }
}

export { BuildPostRoute }