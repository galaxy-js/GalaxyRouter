import GalaxyRoute from './GalaxyRoute.js'

export default class GalaxyRouter extends EventTarget {

  /**
   * Active route
   *
   * @type {GalaxyRoute}
   */
  active = null

  /**
   * Actual URL
   *
   * @type {URL}
   */
  url = null

  constructor (routes) {
    super()

    this.routes = routes.map(route => new GalaxyRoute(route))

    // Init route change detection
    this._detectRouteChanges()
  }

  push (path) {
    this._changeRoute('push', path)
  }

  replace (path) {
    this._changeRoute('replace', path)
  }

  _changeRoute (mode, path) {
    window.history[`${mode}State`]({}, document.title, path)
    this._onRouteChange()
  }

  _onRouteChange () {
    this.url = new URL(window.location)
    const previous = this.active

    for (const route of this.routes) {
      if (route.match(this.url.pathname)) {
        this.active = route
        break
      }
    }

    if (this.active !== previous) {
      this.dispatchEvent(
        new CustomEvent('routeChange', {
          detail: {
            actual: this.active,
            previous
          }
        })
      )
    }
  }

  _detectRouteChanges () {
    window.addEventListener('popstate', this._onRouteChange.bind(this))
    this._onRouteChange()
  }
}
