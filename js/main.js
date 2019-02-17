import {LitElement, css, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import searchMainCSS from '../css/search-main.css.js'
import './com/search-control.js'
import './com/category-nav.js'
import './com/filters-sidebar.js'
import './com/search-results.js'

class Search extends LitElement {
  static get properties() {
    return {
      currentCategory: {type: String}
    }
  }

  constructor () {
    super()
    this.currentCategory = 'all'
  }

  render() {
    var query = 'todo'
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <header>
        <img class="brand" src="/img/beaker-logo.png">
        <search-control></search-control>
        <div class="spacer"></div>
        <a><span class="fas fa-th"></span></a>
        <a><span class="fas fa-bell"></span></a>
        <a href="dat://profile"><img class="profile" src="/img/tmp-profile.png"></a>
      </header>
      <nav>
        <category-nav></category-nav>
      </nav>
      <div class="num-results">
        3 results found.
      </div>
      <main>
        <search-results></search-results>
        <filters-sidebar></filters-sidebar>
      </main>
      <footer>
        <div class="other-engines">
          <p>Try your search on other engines:</p>
          <div class="other-engines-grid">
            <a class="link" href="https://duckduckgo.com${query ? '?q=' + encodeURIComponent(query) : ''}" target="_blank"><img src="/img/engines/duckduckgo.png"> DuckDuckGo</a>
            <a class="link" href="https://google.com/search${query ? '?q=' + encodeURIComponent(query) : ''}" target="_blank"><img src="/img/engines/google.png"> Google</a>
            <a class="link" href="https://en.wikipedia.org/wiki/Special:Search/${query ? '?q=' + encodeURIComponent(query) : ''}" target="_blank"><img src="/img/engines/wikipedia.png"> Wikipedia</a>
            <a class="link" href="https://twitter.com/search${query ? '?q=' + encodeURIComponent(query) : ''}" target="_blank"><img src="/img/engines/twitter.png"> Twitter</a>
            <a class="link" href="https://reddit.com/search${query ? '?q=' + encodeURIComponent(query) : ''}" target="_blank"><img src="/img/engines/reddit.png"> Reddit</a>
            <a class="link" href="https://www.youtube.com/results?search_query=${query ? '?q=' + encodeURIComponent(query) : ''}" target="_blank"><img src="/img/engines/youtube.png"> YouTube</a>
            <a class="link" href="https://github.com/search${query ? '?q=' + encodeURIComponent(query) : ''}" target="_blank"><img src="/img/engines/github.png"> GitHub</a>
          </div>
        </div>
      </footer>
    `
  }

  onSetCategory (e) {
    this.currentCategory = e.detail.category
  }
}
Search.styles = searchMainCSS

customElements.define('search-main', Search)
