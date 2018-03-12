declare namespace IRouteGenerator {
    interface IOptions {
        routes: Array<IRouteGenerator.IRoute>;
        app: any;
        baseUri?: string;
        plugins?: Array<any>;
    }
}
