import { compileRouteRegex } from './utils.js'

export default class GalaxyRoute {

  /**
   * Path matcher
   *
   * @type {RegExp}
   */
  _matcher = null

  /**
   * Route params
   *
   * @type {Object.<string>}
   */
  params = {}

  constructor (route) {
    this._def = route

    this.path = route.path
    this.element = route.element

    this._init()
  }

  match (path) {
    const matched = this._matcher.exec(path)

    if (matched) {
      this.params = { ...matched.groups }
    }

    return !!matched
  }

  _init () {

    // Compile matcher
    this._matcher = compileRouteRegex(this.path)

    // Register element
    window.customElements.define(this.element.is, this.element)
  }
}
