const { Router } = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const chalk = require('chalk')

class RouteGenerator {
  constructor(options) {
    this.options = options
    this.generatedRoutes = Router()
    this.instantiate()
  }

  instantiate() {
    try {
      if (this.appInstanceIsPresent() && this.routesArePresent()) {
        this.setDefaults()

        this.options.routes.forEach(route => this.createRoute(route))
      }
    } catch (error) {
      this.errorHandler(error)
    }
  }

  uriPathIsPresent(route) {
    if (!route.uri) {
      throw ('Your route needs a uri')
    }

    return true
  }

  routeModelIsPresent(route) {
    if (!route.model) {
      throw ('Your route needs a model')
    }

    return true
  }

  appInstanceIsPresent() {
    if (!this.options.app || typeof this.options.app !== 'function') {
      throw ('Your must provide an instance of your application to assign routes to')
    }

    return true
  }

  routesArePresent() {
    if (!this.options.routes || this.options.routes.length === 0) {
      throw ('Your must provide at least one route')
    }

    return true
  }

  setDefaults() {
    this.options.app.use(bodyParser.json())
    this.setBaseUri()
  }

  setBaseUri() {
    if (this.options.baseUri) {
      this.options.app.use(this.options.baseUri, this.generatedRoutes)
    } else {
      this.options.app.use('/api', this.generatedRoutes)
    }
  }

  getHandlersForRoute(route) {
    if (!route.handlers || route.handlers.length === 0) {
      return []
    }

    return route.handlers
  }

  createRoute(route) {
    try {
      if (this.uriPathIsPresent(route) && this.routeModelIsPresent(route)) {
        if (route.methods && route.methods.length === 0 || !route.methods) {
          this.buildGetRoute('get', route)
        } else {
          route.methods.forEach(method => {
            switch (method) {
              case 'get':
                this.buildGetRoute(method, route)
                break
              case 'post':
                this.buildPostRoute(method, route)
                break
              case 'delete':
                this.buildDeleteRoute(method, route)
                break
            }
          })
        }
      }
    } catch (error) {
      this.errorHandler(error)
    }
  }

  buildGetRoute(method, route) {
    this.generatedRoutes[method](route.uri, this.getHandlersForRoute(route), (req, res) => {
      route.model.find({}, (err, documents) => {
        if (err) {
          res.status(400).send({
            message: err
          })
        }

        res.status(200).send(documents)
      })
    })

    this.generatedRoutes[method](route.uri + '/:id', (req, res) => {
      route.model.findById(req.params.id).then((document) => {
        res.status(200).send(document)
      }).catch((err) => {
        res.status(400).send({
          message: 'No document exists with that id'
        })
      })
    })
  }

  buildPostRoute(method, route) {
    this.generatedRoutes[method](route.uri, this.getHandlersForRoute(route), (req, res) => {
      route.model.create(req.body).then(() => {
        res.status(200).send({
          message: 'Document created'
        })
      }).catch((err) => {
        res.status(400).send({
          message: 'Document could not be created',
          reason: err.message
        })
      })
    })
  }

  buildDeleteRoute(method, route) {
    this.generatedRoutes[method](route.uri + '/:id', this.getHandlersForRoute(route), (req, res) => {
      route.model.remove({ _id: req.params.id }).then(() => {
        res.status(200).send({
          message: 'Document removed'
        })
      }).catch((err) => {
        res.status(404).send({
          message: 'No document exists with that id'
        })
      })
    })
  }

  errorHandler(message) {
    console.log(chalk.blue.bold('Dynamic Route Creation Plugin Error: ') + chalk.red.bold(message))
  }
}

module.exports = { RouteGenerator }
