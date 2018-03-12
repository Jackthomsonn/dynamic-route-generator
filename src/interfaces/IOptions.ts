namespace IRouteGenerator {
  export interface IOptions {
    routes: Array<IRouteGenerator.IRoute>
    app: any
    baseUri?: string
    plugins?: Array<any>
  }
}