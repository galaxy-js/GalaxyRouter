import { GalaxyDirective } from 'https://cdn.jsdelivr.net/gh/LosMaquios/GalaxyJS/dist/galaxy.esm.js'

export default class RouterViewDirective extends GalaxyDirective {
  static get options () {
    return {
      $plain: true,
      $render: false
    }
  }

  static get is () {
    return '*router-view'
  }

  init () {
    this.router = this.$scope.$router

    this.router.addEventListener('routeChange', this._changeView.bind(this))
    this._changeView()
  }

  _changeView () {
    const route = this.router.active

    if (route) {
      const instance = new route.element()
      const { firstChild } = this.$element

      if (firstChild) {
        this.$element.replaceChild(instance, firstChild)
      } else {
        this.$element.append(instance)
      }
    }
  }
}
