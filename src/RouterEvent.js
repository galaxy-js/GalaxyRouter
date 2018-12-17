export default class RouterEvent extends Event {
  constructor (type, init) {
    super(type, init)

    /**
     * Actual active route
     *
     * @type {GalaxyRoute}
     */
    this.$actual = init.actual

    /**
     * Previous active route
     *
     * @type {GalaxyRoute}
     */
    this.$previous = init.previous
  }
}
