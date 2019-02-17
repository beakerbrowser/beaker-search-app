import {LitElement, css, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
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
    `
  }

  onSetCategory (e) {
    this.currentCategory = e.detail.category
  }
}
Search.styles = css`
header {
  display: flex;
  background: #f7f7f7;
  height: 50px;
  padding: 10px 20px;
  align-items: center;
}

header img.brand {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

header search-control {
  width: 600px;
  height: 40px;
}

header .spacer {
  flex: 1;
}

header a {
  margin-right: 30px;
  font-size: 18px;
  font-weight: 300;
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

header img.profile {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.15);
}

nav {
  background: #f7f7f7;
  padding: 0 90px;
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.num-results {
  color: #777;
  background: #fff;
  padding: 22px 90px;
}

main {
  display: flex;
  padding: 0 90px;
}

main search-results {
  width: 600px;
  margin-right: 50px;
}
`

customElements.define('search-main', Search)
