namespace IRouteGenerator {
  export interface IRoute {
    uri: string
    model: any
    handlers: Array<() => void>
    methods: Array<IRouteGenerator.IMethod>
  }
}