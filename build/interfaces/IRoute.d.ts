declare namespace IRouteGenerator {
    interface IRoute {
        uri: string;
        model: any;
        methods: Array<IRouteGenerator.IMethod>;
    }
}
