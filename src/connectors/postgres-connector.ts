import { Model } from 'sequelize';

export class PostgresConnector implements IRouteGenerator.IDatabaseConnector {
  constructor(private database: Model<any, any>) {
    this.database = database;
  }

  public find(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.findAll().then((d) => {
        if (!d) {
          reject()
        } else {
          resolve(d)
        }
      }).catch(reject)
    })
  }

  public findById(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.findOne({ where: { id } }).then((document: Document) => {
        if (!document) {
          reject()
        } else {
          resolve(document)
        }
      }).catch(reject)
    })
  }

  public create(body: JSON): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.create(body).then(resolve).catch(reject)
    })
  }

  public update(id: string, body: JSON, _options?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.update(body, { where: { id } }).then((edited: Array<any>) => {
        if (edited[0] === 0) {
          reject()
        } else {
          resolve()
        }
      }).catch(reject)
    })
  }

  public delete(id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.database.destroy({ where: { id } }).then((exists: number) => {
        if (exists === 0) {
          reject()
        } else {
          resolve()
        }
      }).catch(reject)
    })
  }
}