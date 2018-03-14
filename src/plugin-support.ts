import * as events from 'events'

class PluginSupport {
  private options: IRouteGenerator.IOptions
  private event: events.EventEmitter

  constructor(options: IRouteGenerator.IOptions) {
    this.options = options
    this.event = new events.EventEmitter()

    this.installPlugins()
  }

  private installPlugins() {
    this.notifyPluginInstalled()

    if (this.options.plugins.length) {
      this.options.plugins.forEach(plugin => { plugin.install(this.event) })
    }
  }

  private notifyPluginInstalled() {
    this.event.on('Plugin Installed', (plugin: any) => {
      this.instantiatePlugin(new plugin())
    })
  }

  private instantiatePlugin(plugin: any) {
    plugin.apply(this.options)
  }
}

export { PluginSupport }