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
          next(new NotFound(err.message))
        })
      } else {
        this.route.model.find({}, (err: Error, documents: Array<Document>) => {
          if (err) {
            next(new NotFound(err.message))
          }

          res.status(200).send(documents)
        })
      }
    })
  }
}

export { BuildGetRoute }