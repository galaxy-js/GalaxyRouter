export default class GalaxyRoute {
  constructor (route) {
    this._def = route

    this.path = route.path
    this.element = route.element

    this._register()
  }

  match (path) {
    return this.path === path
  }

  _register () {
    window.customElements.define(this.element.is, this.element)
  }
}
