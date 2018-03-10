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

const routes = [{
    uri: '/list/games',
    model: GameModel,
    methods: [{
      name: 'get',
      handlers: []
    }, {
      name: 'post',
      handlers: []
    }]
  }, {
    uri: '/live/games',
    model: GameModel
}]

new RouteGenerator({
  routes: routes,
  app: app,
  baseUri: '/api'
})

app.listen(8080)

```

## API

#### Routes API

| Property      | Default         | Information                                                                        |
| ------------- |---------------- | ---------------------------------------------------------------------------------- |
| uri           | none            | The uri for the route you are creating                                             |
| model         | none            | The data model that represents the object for this route                           |
| methods       | If you do not specify any methods it will default to creating a GET route                            | Methods you want to be avaiable to this route along with any handlers. An example of a handler could be that of an authentication check|

#### Route Generator API

| Property      | Default       | Information                                   |
| ------------- |-------------  | --------------------------------------------- |
| routes        |  none         | An array of routes you wish to generate       |
| app           | none          | The app instance you wish to assign routes to |
| baseUri       | /api          | The base uri where the api will start from    |
