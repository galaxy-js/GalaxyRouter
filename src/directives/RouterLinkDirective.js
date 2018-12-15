import { GalaxyDirective } from 'https://cdn.jsdelivr.net/gh/LosMaquios/GalaxyJS/dist/galaxy.esm.js'

export default class RouterLinkDirective extends GalaxyDirective {
  static get options () {
    return {
      $plain: true,
      $render: false
    }
  }

  static get is () {
    return '*router-link'
  }

  init () {
    console.log('THis element', this.$element)

    this.router = this.$scope.$router

    // Detect click
    this.$element.addEventListener('click', this._performRouteChange.bind(this))
  }

  _performRouteChange (event) {

    // Prevent redirection
    event.preventDefault()

    this.router.push(this.$element.href)
  }
}
