import GalaxyRoute from './GalaxyRoute.js'
import RouterEvent from './RouterEvent.js'

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

  /**
   * Router started?
   *
   * @type {boolean}
   */
  get started () {
    return !!this.__bindRouteChange
  }

  constructor (routes) {
    super()

    this.routes = routes.map(route => new GalaxyRoute(route))
  }

  push (path) {
    this._changeRoute('push', path)
  }

  replace (path) {
    this._changeRoute('replace', path)
  }

  _changeRoute (mode, path) {
    if (!this.url || this.url.pathname !== path) {
      window.history[`${mode}State`]({}, document.title, path)
      this._onRouteChange()
    }
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
        new RouterEvent('routeChange', {
          actual: this.active,
          previous
        })
      )
    }
  }

  start () {
    if (this.started) return

    this.__bindRouteChange = this._onRouteChange.bind(this)

    window.addEventListener('popstate', this.__bindRouteChange)
    this._onRouteChange()
  }

  stop () {
    if (this.started) {
      window.removeEventListener('popstate', this.__bindRouteChange)
      this.__bindRouteChange = null
    }
  }
}
