import { GalaxyPlugin } from 'https://cdn.jsdelivr.net/gh/LosMaquios/GalaxyJS/dist/galaxy.esm.js'

import GalaxyRouter from './GalaxyRouter.js'

import RouterLinkDirective from './directives/RouterLinkDirective.js'
import RouterViewDirective from './directives/RouterViewDirective.js'

/**
 * Export classes
 */
export { GalaxyRouter, RouterLinkDirective, RouterViewDirective }
export { default as GalaxyRoute } from './GalaxyRoute.js'

/**
 * Export plugin
 */
export default class GalaxyRouterPlugin extends GalaxyPlugin {
  static init ({ directives }) {
    this.$router = new GalaxyRouter(this.$options.routes)

    // Install directives
    directives.push(RouterLinkDirective, RouterViewDirective)
  }

  static install (GalaxyElement) {
    GalaxyElement.prototype.$router = this.$router
  }
}
