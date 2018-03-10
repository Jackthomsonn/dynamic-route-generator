import { Request, Response } from 'express'
import { RouteBuilder } from '../route/route-builder'

class BuildPostRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildPostRoute()
  }

  public buildPostRoute() {
    (this.generatedRoutes as any)[this.method](this.route.uri, this.getHandlersForRoute(this.route, this.method), (req: Request, res: Response) => {
      this.route.model.create(req.body).then(() => {
        res.status(200).send({
          message: 'Document created'
        })
      }).catch((err: Error) => {
        res.status(400).send({
          message: err.message
        })
      })
    })
  }
}

export { BuildPostRoute }