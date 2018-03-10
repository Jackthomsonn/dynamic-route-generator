namespace IRouteGenerator {
  export interface IRoute {
    uri: string
    model: any
    methods: Array<IRouteGenerator.IMethod>
  }
}