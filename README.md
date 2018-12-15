# GalaxyRouter

  Under construction experimental router for GalaxyJS

## Installation and usage

```js
import { GalaxyRouter, RouterViewDirective, RouterLinkDirective } from ''

Galaxy.setup({
  directives: [
    RouterViewDirective,
    RouterLinkDirective,
    // ...
  ],
  plugins: {
    $router: new GalaxyRouter([

      /**
       * Route elements must have `is` property
       */
      { name: '/home', element: HomeElement },
      { name: '/about', element: AboutElement }
    ])
  }
})
```

```js
class RootElement extends GalaxyElement {
  static get template () {
    return html`
      <h1>Testing routing</h1>

      <ul>
        <li><a *router-link href="/home">Home</a></li>
        <li><a *router-link href="/about">About</a></li>
      </ul>

      <div *router-view></div>
    `
  }

  constructor () {
    this.$router // <- Injected router instance
  }
}
```

## Working example

  You can clone this repository and serve `index.html` in a friendly-history API server.
