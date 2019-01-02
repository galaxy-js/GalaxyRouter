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
  static init ({ elements, directives }) {
    const { routes } = this.$options

    this.$router = new GalaxyRouter(routes)

    const registrations = []

    // Install route elements
    routes.forEach(({ element }) => {
      elements.push(element)
      registrations.push(window.customElements.whenDefined(element.is))
    })

    // Install directives
    directives.push(RouterLinkDirective, RouterViewDirective)

    // Start router after elements registration
    Promise
      .all(registrations)
      .then(() => { this.$router.start() })
  }

  static install (GalaxyElement) {
    GalaxyElement.prototype.$router = this.$router
  }
}
