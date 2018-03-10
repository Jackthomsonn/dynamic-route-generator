
import { Request, Response } from 'express'
import { RouteBuilder } from '../route/route-builder'

class BuildPutRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildPutRoute()
  }

  public buildPutRoute() {
    (this.generatedRoutes as any)[this.method](this.route.uri + '/:id', this.setHandlersForRouteMethod(this.route, this.method), (req: Request, res: Response) => {
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