 # dynamic-route-generator
Dynamically generate REST endpoints for your application

## How to use

##### If using Postgres as your database

``` javascript
import { Sequelize, STRING, ARRAY } from "sequelize";

const { RouteGenerator } = require('dynamic-route-generator');
const Sequelize = require('sequelize')
const { XAuth } = require('x-auth-plugin')

export class PostgresInstance {
  constructor(app) { }

  setup() {
    const sequelize: Sequelize = new Sequelize('testdb', 'admin', '1234', {
      host: 'localhost',
      dialect: 'postgres',
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      logging: false,
      operatorsAliases: false
    });

    const GameModel = sequelize.define('gameschema', {
      name: {
        type: STRING,
        allowNull: false
      },
      players: {
        type: ARRAY(STRING),
        allowNull: false
      }
    })

    sequelize.sync().then(() => {
      const routes = [{
        uri: '/list/games',
        model: GameModel,
        methods: [{
          name: 'get'
        }, {
          name: 'post'
        }, {
          name: 'put'
        }, {
          name: 'delete'
        }]
      }]

      new RouteGenerator({
        routes: routes,
        database: 'postgres',
        app: this.app,
        plugins: {
          pre: [],
          post: []
        }
      })

      this.app.listen(8080)
    })
  }
}

```

##### If using Mongo as your database

``` javascript
import { Schema, connect, model } from "mongoose";

const { RouteGenerator } = require('dynamic-route-generator');

export class MongoInstance {
  constructor(app) { }

  setup() {
    const GameSchema = new Schema({
      name: {
        required: true,
        type: String
      },
      playersOnline: {
        required: true,
        type: Number
      }
    })

    connect('mongodb://localhost/test').then(() => {
      const routes = [{
        uri: '/list/games',
        model: model('GameSchema', GameSchema),
        methods: [{
          name: 'get'
        }, {
          name: 'post'
        }, {
          name: 'put'
        }, {
          name: 'delete'
        }]
      }]

      new RouteGenerator({
        routes: routes,
        database: 'mongo',
        app: this.app,
        plugins: {
          pre: [],
          post: []
        }
      })

      this.app.listen(8080)
    })
  }
}

```

##### index.js

``` javascript
import express from 'express';
import { PostgresInstance } from './postgres-setup';
import { MongoInstance } from './mongo-setup';

const app = express()
const databaseToUse = process.argv[2].substr(2)

if (databaseToUse === 'postgres') {
  new PostgresInstance(app).setup();
} else {
  new MongoInstance(app).setup();
}

```

## API

#### Route Generator API

| Property      | Default Value         | Required | Information                                                                 |
| ------------- |---------------------- | -------- | --------------------------------------------------------------------------- |
| routes        | none                  | True | An array of routes you wish to generate                                         |
| database      | mongo                 | True | The kind of database you wish to use, currently supports Mongo and Postgres     |
| app           | none                  | True | The app instance you wish to assign routes to                                   |
| baseUri       | /                     | False | The base uri where the api will start from                                     |
| plugins       | none                  | True | Plugins that can be run inside of the Dynamic Route Generator                   |

```
plugins = {
  pre: [PluginName],
  post: [PluginName2, PluginName3]
}
```


#### Routes API

| Property      | Default Value        | Required | Information                                                                  |
| ------------- |---------------- | -------- | --------------------------------------------------------------------------------- |
| uri           | none            | True |The uri for the route you are creating                                                 |
| model         | none            | True | The data model that represents the object for this route                              |
| handlers      | []              | False | Global handlers you want to apply to all methods                                     |
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
