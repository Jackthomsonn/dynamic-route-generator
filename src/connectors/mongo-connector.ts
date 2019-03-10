import { Model } from "mongoose";

export class MongoConnector implements IRouteGenerator.IDatabaseConnector {
  constructor(private database: Model<any>) {
    this.database = database
  }

  public find(query: string | undefined) {
    return new Promise((resolve, reject) => {
      this.database.find(query).then(resolve).catch(reject)
    })
  }

  public findById(id: string) {
    return new Promise((resolve, reject) => {
      this.database.findOne({ _id: id }).then((document: Document) => {
        if (!document) {
          reject()
        } else {
          resolve(document)
        }
      }).catch(reject)
    })
  }

  public create(body: JSON) {
    return new Promise((resolve, reject) => {
      this.database.create(body).then(resolve).catch(reject)
    })
  }

  public update(id: string, body: JSON, options?: any) {
    return new Promise((resolve, reject) => {
      this.database.findOneAndUpdate({ _id: id }, body, options).then(resolve).catch(reject)
    })
  }

  public delete(id: string) {
    return new Promise((resolve, reject) => {
      this.database.remove({ _id: id }).then(resolve).catch(reject)
    })
  }
}
