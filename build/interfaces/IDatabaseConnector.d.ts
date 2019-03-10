declare namespace IRouteGenerator {
    interface IDatabaseConnector {
        find(query: string): Promise<any>;
        findById(id: string): Promise<any>;
        create(body: JSON): Promise<any>;
        update(id: string, body: JSON, options?: any): Promise<any>;
        delete(id: string): Promise<any>;
    }
}
