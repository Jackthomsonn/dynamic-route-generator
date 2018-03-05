const { Router } = require('express')
const chalk = require('chalk')

class DynamicRouteCreation {
  constructor(routesToGenerate) {
    this.generatedRoutes = Router()
    this.routesToGenerate = routesToGenerate
    this.instantiate()
  }

  instantiate() {
    if (!this.routesToGenerate || this.routesToGenerate.length === 0) {
      this.errorHandler('You must provide at least one route that you wish to create')
    } else {
      this.routesToGenerate.forEach(route => {
        this.createRoute(route)
      })
    }
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
    this.generatedRoutes[method](route.uri, (req, res) => {
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
    this.generatedRoutes[method](route.uri, (req, res) => {
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
    this.generatedRoutes[method](route.uri + '/:id', (req, res) => {
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

  errorHandler(message) {
    console.log(chalk.blue.bold('Dynamic Route Creation Plugin Error: ') + chalk.red.bold(message))
  }
}

module.exports = DynamicRouteCreation
