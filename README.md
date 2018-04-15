 # dynamic-route-generator
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
const { RouteGenerator } = require('dynamic-route-generator')
const app = new express()

mongoose.connect('mongodb://localhost/test')

// Creating routes with handlers specific for a route method
// For example performing an authentication check only on a GET method on a route
const routes = [{
  uri: '/list/games',
  model: GameModel,
  methods: [{
    name: 'get',
    handlers: [CheckAuthentication]
  },{
    name: 'post',
    handlers: []
   }]
 }, {
   uri: '/live/games',
   model: GameModel
 }]

// Creating routes with global handlers and method names as string literals
// For example an authentication check which works across all methods on a route

const routes = [{
  uri: '/list/games',
  model: GameModel,
  handlers: [CheckAuthentication],
  methods: ['get', 'post']
}]

new RouteGenerator({
  routes: routes,
  app: app,
  baseUri: '/api', // Default is /
  plugins: []
})

app.listen(8080)

```

## API

#### Route Generator API

| Property      | Default Value       | Required | Information                                                      |
| ------------- |-------------  | -------- | --------------------------------------------------------------- |
| routes        | none          | True | An array of routes you wish to generate                          |
| app           | none          | True | The app instance you wish to assign routes to                    |
| baseUri       | /             | False | The base uri where the api will start from                       |
| plugins       | none          | False | An array of third party plugins built for the Route Generator    |


#### Routes API

| Property      | Default Value        | Required | Information                                                                        |
| ------------- |---------------- | -------- | --------------------------------------------------------------------------------- |
| uri           | none            | True |The uri for the route you are creating                                             |
| model         | none            | True | The data model that represents the object for this route                           |
| handlers      | []              | False | Global handlers you want to apply to all methods                                   |
| methods       | ['get']         | False | If you do not specify any methods it will default to creating a GET route; Methods you want to be avaiable for this route along with any handlers. An example of a handler could be that of an authentication check |

```
methods = [{
  name: 'get',
  handlers: []
}]

- OR -

methods = ['get']
```

## Develop custom plugins

If you would like to create your own custom plugins, take a look at [api-docs](https://github.com/Jackthomsonn/dynamic-api-docs) example

### API Definition

**Methods**

`install` - A static method that simply executes an event named 'Plugin Installed' and internally, will execute the given code in the 'apply' method

`apply` - A method that executes your plugins code. The apply method gives you access to the routes object as the first argument
