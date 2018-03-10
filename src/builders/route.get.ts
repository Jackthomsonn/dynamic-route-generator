import { Request, Response } from 'express'
import { RouteBuilder } from './route-builder'

class BuildGetRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)
    this.buildGetRoute()
  }

  public buildGetRoute() {
    (this.generatedRoutes as any)[this.method]([this.route.uri, this.route.uri + '/:id'], this.setHandlersForRouteMethod(this.route, 'get'), (req: Request, res: Response) => {
      if (req.params && req.params.id) {
        this.route.model.findById(req.params.id).then((document: Document) => {
          res.status(200).send(document)
        }).catch((err: Error) => {
          res.status(400).send({
            message: err.message
          })
        })
      } else {
        this.route.model.find({}, (err: Error, documents: Array<Document>) => {
          if (err) {
            res.status(400).send({
              message: err.message
            })
          }

          res.status(200).send(documents)
        })
      }
    })
  }
}

export { BuildGetRoute }