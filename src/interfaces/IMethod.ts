namespace IRouteGenerator {
  export interface IMethod {
    name: string
    handlers: Array<() => void>
  }
}