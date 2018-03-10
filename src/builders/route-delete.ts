import { Request, Response } from 'express'
import { RouteBuilder } from '../route/route-builder'

class BuildDeleteRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildDeleteRoute()
  }

  public buildDeleteRoute() {
    (this.generatedRoutes as any)[this.method](this.route.uri + '/:id', this.getHandlersForRoute(this.route, this.method), (req: Request, res: Response) => {
      this.route.model.remove({ _id: req.params.id }).then(() => {
        res.status(200).send({
          message: 'Document removed'
        })
      }).catch((err: Error) => {
        res.status(404).send({
          message: err.message
        })
      })
    })
  }
}

export { BuildDeleteRoute }