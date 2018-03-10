import { Request, Response } from 'express';
import { IRoute } from './../interfaces/IRoute';
import { RouteBuilder } from "../route-builder"
import { IOptions } from '../interfaces/IOptions';

class BuildGetRoute extends RouteBuilder {
  constructor(method: string, route: IRoute, options: IOptions) {
    super(method, route, options)
    this.buildGetRoute()
  }

  public buildGetRoute() {
    (<any>this.generatedRoutes)[this.method]([this.route.uri, this.route.uri + '/:id'], this.getHandlersForRoute(this.route), (req: Request, res: Response) => {
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