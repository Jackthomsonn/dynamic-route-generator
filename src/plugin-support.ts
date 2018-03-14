import * as events from 'events'

class PluginSupport {
  private options: IRouteGenerator.IOptions
  private event: events.EventEmitter
  private pluginStore: Array<any>

  constructor(options: IRouteGenerator.IOptions) {
    this.options = options
    this.event = new events.EventEmitter()
    this.pluginStore = []

    this.installPlugins()
  }

  private installPlugins() {
    this.notifyPluginInstalled()

    if (this.options.plugins.length > 0) {
      this.options.plugins.forEach(plugin => {
        plugin.install(this.event)
      })
    }
  }

  private notifyPluginInstalled() {
    this.event.on('Plugin Installed', (pluginInformation: any, plugin: any) => {
      this.pluginStore.push(pluginInformation)
      this.instantiatePlugin(plugin)
    })
  }

  private instantiatePlugin(plugin: any) {
    plugin.apply(this.options)
  }
}

export { PluginSupport }