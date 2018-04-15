declare namespace IRouteGenerator {
    interface IRoute {
        uri: string;
        model: any;
        handlers: Array<() => void>;
        methods: Array<IRouteGenerator.IMethod>;
    }
}
