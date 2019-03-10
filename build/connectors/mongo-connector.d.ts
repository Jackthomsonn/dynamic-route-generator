import { Model } from "mongoose";
export declare class MongoConnector implements IRouteGenerator.IDatabaseConnector {
    private database;
    constructor(database: Model<any>);
    find(query: string | undefined): Promise<{}>;
    findById(id: string): Promise<{}>;
    create(body: JSON): Promise<{}>;
    update(id: string, body: JSON, options?: any): Promise<{}>;
    delete(id: string): Promise<{}>;
}
