import {LitElement, css, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
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
        <a @click=${this.onClickAppMenu}><span class="fas fa-th"></span></a>
        <a class="todo"><span class="fas fa-bell"></span></a>
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

  // event handlers
  // =

  onSetCategory (e) {
    this.currentCategory = e.detail.category
  }

  onClickAppMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    var rect = e.currentTarget.getClientRects()[0]
    var x = rect.right + 10
    var y = rect.top + e.currentTarget.offsetHeight
    contextMenu.create({
      x,
      y,
      render () {
        return html`
          <style>
            .appmenu {
              display: grid;
              grid-template-columns: 1fr 1fr 1fr;
              padding: 20px 20px;
            }
            .appmenu .dropdown-item {
              font-size: 14px;
              text-align: center;

              /* all same dimensions */
              padding: 7px 15px;
              width: 80px;
              line-height: 40px;
              
              /* remove link styles */
              color: #444;
              text-decoration: none;

              /* remove dropdown-item border */
              border: 0;
            }
            .appmenu .dropdown-item img {
              width: 32px;
              height: 32px;

              /* center */
              display: block;
              margin: 0 auto;
            }
            .appmenu .dropdown-item img.profile {
              border-radius: 50%;
            }
          </style>
          <div class="appmenu dropdown-items right">
            <a class="dropdown-item" href="dat://feed">
              <img src="/vendor/beaker-app-stdlib/img/icons/newsfeed.png">
              News Feed
            </a>
            <a class="dropdown-item" href="dat://library">
              <img src="/vendor/beaker-app-stdlib/img/icons/library.png">
              Library
            </a>
            <a class="dropdown-item" href="dat://search">
              <img src="/vendor/beaker-app-stdlib/img/icons/search.png">
              Search
            </a>
            <a class="dropdown-item" href="dat://bookmarks">
              <img src="/vendor/beaker-app-stdlib/img/icons/bookmarks.png">
              Bookmarks
            </a>
            <a class="dropdown-item" href="dat://profile">
              <img class="profile" src="/img/tmp-profile.png">
              Your Profile
            </a>
          </div>
        `
      }
    })
  }
}
Search.styles = searchMainCSS

customElements.define('search-main', Search)
