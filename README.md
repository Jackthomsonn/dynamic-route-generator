# route-generation
Dynamically generate REST endpoints for your application

## How to use

##### game.model.js

``` javascript

const mongoose = require('mongoose')

const gameSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String
  },
  playersOnline:{
    required: true,
    type: Number
  }
})

module.exports = mongoose.model('GameModel', gameSchema)

```

##### index.js

``` javascript

const express = require('express')
const mongoose = require('mongoose')
const GameModel = require('./models/game.model')
const { RouteGenerator } = require('route-generation')
const app = new express()

mongoose.connect('mongodb://localhost/test')

const routes = [
  {
    uri: '/list/games',
    model: GameModel,
    handlers: [],
    methods: ['get', 'post', 'put', 'delete']
  }, {
    uri: '/live/games',
    model: GameModel
  }
]

new RouteGenerator({
  routes: routes,
  app: app,
  baseUri: '/api'
})

app.listen(8080)

```

## API

#### Routes API

| Property      | Default       | Information                                                                        |
| ------------- |-------------  | ---------------------------------------------------------------------------------- |
| uri           | none          | The uri for the route you are creating                                             |
| model         | none          | The data model that represents the object for this route                           |
| handlers      | none          | Any middlware that needs to be present on this route, for example Authentication   |
| methods       | GET           | Methods you want to be avaiable to this route                                      |

#### Route Generator API

| Property      | Default       | Information                                   |
| ------------- |-------------  | --------------------------------------------- |
| routes        |  none         | An array of routes you wish to generate       |
| app           | none          | The app instance you wish to assign routes to |
| baseUri       | /api          | The base uri where the api will start from    |
