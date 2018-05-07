namespace IRouteGenerator {
  export interface IOptions {
    routes: Array<IRouteGenerator.IRoute>
    app: any
    baseUri: string
    plugins: { pre: Array<any>, post: Array<any> }
  }
}