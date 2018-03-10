import { IRoute } from './IRoute'

import * as Express from 'express'

export interface IOptions {
  routes: Array<IRoute>
  app: Express.Application
  baseUri?: string
}