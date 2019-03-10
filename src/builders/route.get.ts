import { NextFunction, Request, Response } from 'express'

import { NotFound } from '../exceptions';
import { RouteBuilder } from './route-builder'

class BuildGetRoute extends RouteBuilder {
  constructor(method: string, route: IRouteGenerator.IRoute, options: IRouteGenerator.IOptions) {
    super(method, route, options)

    this.buildGetRoute()
  }

  public buildGetRoute() {
    (this.generatedRoutes as any)[this.method]([this.route.uri, this.route.uri + '/:id'], this.setHandlersForRouteMethod(this.route, 'get'), (req: Request, res: Response, next: NextFunction) => {
      if (req.params && req.params.id) {
        this.route.model.findById(req.params.id).then((document: Document) => {
          res.status(200).send(document)
        }).catch((err: Error) => {
          if (err && err.message) {
            next(new NotFound(err.message))
          } else {
            next(new NotFound())
          }
        })
      } else {
        this.route.model.find().then(((documents: Array<Document>) => {
          res.status(200).send(documents)
        })).catch((err: Error) => {
          if (err && err.message) {
            next(new NotFound(err.message))
          } else {
            next(new NotFound())
          }
        })
      }
    })
  }
}

export { BuildGetRoute }