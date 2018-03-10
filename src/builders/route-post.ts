import { IOptions } from './../interfaces/IOptions';
import { IRoute } from './../interfaces/IRoute'
import { RouteBuilder } from '../route-builder'
import { Request, Response } from 'express'

class BuildPostRoute extends RouteBuilder {
  constructor(method: string, route: IRoute, options: IOptions) {
    super(method, route, options)
    this.buildPostRoute()
  }

  buildPostRoute() {
    (<any>this.generatedRoutes)[this.method](this.route.uri, this.getHandlersForRoute(this.route), (req: Request, res: Response) => {
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