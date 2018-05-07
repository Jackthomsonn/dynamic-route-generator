import * as events from 'events'
import { ErrorHandler } from './error';

class PluginSupport {
  private options: IRouteGenerator.IOptions
  private event: events.EventEmitter

  constructor(options: IRouteGenerator.IOptions, event: events.EventEmitter) {
    this.options = options
    this.event = event

    this.installPlugins()
  }

  private installPlugins() {
    this.notifyPluginInstalled()

    if (this.options.plugins.pre && this.options.plugins.pre.length) {
      this.options.plugins.pre.forEach(plugin => {
        try {
          if (plugin) {
            plugin.install(this.event)
          }
        } catch (error) {
          ErrorHandler.handleError(new Error(`An error occurred in ${plugin.name}: ${error.stack}`))
        }
      })
    }

    this.event.on('post-plugins', () => {
      if (this.options.plugins.post && this.options.plugins.post.length) {
        this.options.plugins.post.forEach(plugin => {
          try {
            if (plugin) {
              plugin.install(this.event)
            }
          } catch (error) {
            ErrorHandler.handleError(new Error(`An error occurred in ${plugin.name}: ${error.stack}`))
          }
        })
      }
    })
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