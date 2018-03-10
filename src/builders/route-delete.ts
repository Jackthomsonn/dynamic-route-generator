import { IRoute } from './../interfaces/IRoute'
import { IRouter, Request, Response } from 'express'
import { RouteBuilder } from "../route-builder"

class BuildDeleteRoute extends RouteBuilder {
  constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>) {
    super(method, route, generatedRoutes)
    this.buildDeleteRoute()
  }

  public buildDeleteRoute() {
    (<any>this.generatedRoutes)[this.method](this.route.uri + '/:id', this.getHandlersForRoute(this.route), (req: Request, res: Response) => {
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