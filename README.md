# GalaxyRouter

  Under construction experimental router for GalaxyJS

## Installation and usage

```js
import GalaxyRouterPlugin from 'https://cdn.jsdelivr.net/gh/aeroxmotion/GalaxyRouter/src/index.js'

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

Galaxy.setup({
  root: RootElement,
  plugins: [
    GalaxyRouterPlugin.with({
      routes: [
        { path: '/home', element: HomeElement },
        { path: '/about', element: AboutElement }
      ]
    })
  ]
})
```

## Working example

  You can clone this repository and serve `index.html` in a friendly-history API server.
