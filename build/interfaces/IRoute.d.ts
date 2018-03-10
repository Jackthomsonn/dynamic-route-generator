export interface IRoute {
    uri: string;
    model: any;
    methods: Array<any>;
    handlers: Array<Function>;
}
