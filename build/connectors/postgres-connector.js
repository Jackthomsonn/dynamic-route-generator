"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PostgresConnector {
    constructor(database) {
        this.database = database;
        this.database = database;
    }
    find() {
        return new Promise((resolve, reject) => {
            this.database.findAll().then((d) => {
                if (!d) {
                    reject();
                }
                else {
                    resolve(d);
                }
            }).catch(reject);
        });
    }
    findById(id) {
        return new Promise((resolve, reject) => {
            this.database.findOne({ where: { id } }).then((document) => {
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
    update(id, body, _options) {
        return new Promise((resolve, reject) => {
            this.database.update(body, { where: { id } }).then((edited) => {
                if (edited[0] === 0) {
                    reject();
                }
                else {
                    resolve();
                }
            }).catch(reject);
        });
    }
    delete(id) {
        return new Promise((resolve, reject) => {
            this.database.destroy({ where: { id } }).then((exists) => {
                if (exists === 0) {
                    reject();
                }
                else {
                    resolve();
                }
            }).catch(reject);
        });
    }
}
exports.PostgresConnector = PostgresConnector;
