declare namespace IRouteGenerator {
    interface IMethod {
        name: string;
        handlers: Array<() => void>;
    }
}
