declare namespace IRouteGenerator {
    interface IOptions {
        routes: Array<IRouteGenerator.IRoute>;
        app: any;
        database: 'mongo' | 'postgres';
        baseUri: string;
        plugins: {
            pre: Array<any>;
            post: Array<any>;
        };
    }
}
