"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MongoConnector {
    constructor(database) {
        this.database = database;
        this.database = database;
    }
    find(query) {
        return new Promise((resolve, reject) => {
            this.database.find(query).then(resolve).catch(reject);
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            this.database.findOne({ _id: id }).then((document) => {
                if (!document) {
                    reject();
                }
                else {
                    resolve(document);
                }
            }).catch(reject);
        });
    }
    create(body) {
        return new Promise((resolve, reject) => {
            this.database.create(body).then(resolve).catch(reject);
        });
    }
    update(id, body, options) {
        return new Promise((resolve, reject) => {
            this.database.findOneAndUpdate({ _id: id }, body, options).then(resolve).catch(reject);
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.remove({ _id: id }).then(resolve).catch(reject);
        });
    }
}
exports.MongoConnector = MongoConnector;
