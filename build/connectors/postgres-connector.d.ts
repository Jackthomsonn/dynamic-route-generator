import { Model } from 'sequelize';
export declare class PostgresConnector implements IRouteGenerator.IDatabaseConnector {
    private database;
    constructor(database: Model<any, any>);
    find(): Promise<any>;
    findById(id: string): Promise<any>;
    create(body: JSON): Promise<any>;
    update(id: string, body: JSON, _options?: any): Promise<any>;
    delete(id: string): Promise<any>;
}
