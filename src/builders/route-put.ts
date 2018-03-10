import { IRouter, Request, Response } from 'express'
import { IRoute } from './../interfaces/IRoute'
import { RouteBuilder } from "../route-builder"

class BuildPutRoute extends RouteBuilder {
  constructor(method: string, route: IRoute, generatedRoutes: IRouter<any>) {
    super(method, route, generatedRoutes)
    this.buildPutRoute()
  }

  public buildPutRoute() {
    (<any>this.generatedRoutes)[this.method](this.route.uri + '/:id', this.getHandlersForRoute(this.route), (req: Request, res: Response) => {
      this.route.model.findOneAndUpdate({ _id: req.params.id }, req.body, { overwrite: true, runValidators: true }).then(() => {
        res.status(200).send({
          message: 'Document updated'
        })
      }).catch((err: Error) => {
        res.status(404).send({
          message: err.message
        })
      })
    })
  }
}

export { BuildPutRoute }