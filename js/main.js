import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {pluralize} from '/vendor/beaker-app-stdlib/js/strings.js'
import * as QP from './lib/query-params.js'
import {profiles, search} from './tmp-beaker.js'
import * as appMenu from '/vendor/beaker-app-stdlib/js/com/app-menu.js'
import searchMainCSS from '../css/search-main.css.js'
import './com/search-control.js'
import './com/category-nav.js'
import './com/filters-dropdown.js'
import './com/search-results.js'

const DAY_IN_MS = 8.64e+7
const WEEK_IN_MS = 6.048e8
const MONTH_IN_MS = 2.628e9
const YEAR_IN_MS = 3.154e10

class Search extends LitElement {
  static get properties() {
    return {
      query: {type: String, reflect: true},
      category: {type: String, reflect: true},
      hops: {type: String, reflect: true},
      since: {type: String, reflect: true},
      results: {type: Array},
    }
  }

  get hopsFilterChoices () {
    return [
      {id: 'all', label: 'All of your network'},
      {id: 'followed', label: 'Followed users'}
    ]
  }

  get sinceFilterChoices () {
    return [
      {id: 'all', label: 'All time'},
      {id: 'day', label: 'Past day'},
      {id: 'week', label: 'Past week'},
      {id: 'month', label: 'Past month'},
      {id: 'year', label: 'Past year'}
    ]
  }

  constructor () {
    super()
    this.query = QP.getParam('q')
    this.category = QP.getParam('category', 'all')
    this.hops = QP.getParam('hops', 'all')
    this.since = QP.getParam('since', 'all')
    this.results = []

    this.user = null
    this.hasEverHadAQuery = false // track if we've ever had a query, and, if so, always show the results view
    this.highlightNonce = 0 // used to decorate search results with bolding

    this.load()
  }

  async load () {
    this.user = await profiles.getCurrentUser()
  }

  attributeChangedCallback (name, oldval, newval) {
    super.attributeChangedCallback(name, oldval, newval)
    if (name === 'query') {
      if (newval) {
        this.hasEverHadAQuery = true // dont show the noquery view again
      }

      // update the URL
      QP.setParams({q: encodeURIComponent(newval)})

      // run the query
      if (newval) {
        this.runQuery()
      }
    }
    if (name === 'category' || name === 'hops' || name === 'since') {
      // update the URL
      QP.setParams({[name]: encodeURIComponent(newval)})

      // run the query
      this.runQuery()
    }
  }

  get userUrl () {
    return this.user ? this.user.url : ''
  }

  get queryDatasets () {
    switch (this.category) {
      case 'sites': return 'sites'
      case 'posts': return 'unwalled.garden/post'
      default: return ['sites', 'unwalled.garden/post']
    }
  }

  get queryHops () {
    if (this.hops === 'followed') return 1
    return 2
  }

  get querySince () {
    switch (this.since) {
      case 'day': return Date.now() - DAY_IN_MS
      case 'week': return Date.now() - WEEK_IN_MS
      case 'month': return Date.now() - MONTH_IN_MS
      case 'year': return Date.now() - YEAR_IN_MS
      default: return undefined
    }
  }

  async runQuery () {
    var res = await search.query({
      query: this.query,
      filters: {
        datasets: this.queryDatasets,
        since: this.querySince
      },
      hops: this.queryHops
    })
    this.results = res.results
    this.highlightNonce = res.highlightNonce
    console.log('Search results:', this.results)

    // refocus the input after render
    await this.updateCompleted
    this.shadowRoot.querySelector('search-control').focus()
  }

  // rendering
  // =

  render() {
    if (this.query || this.hasEverHadAQuery) {
      return this.renderWithQuery()
    }
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="noquery-container">
        <header>
          <div class="spacer"></div>
          <a @click=${this.onClickAppMenu}><span class="fas fa-th"></span></a>
          <a class="todo"><span class="fas fa-bell"></span></a>
          <a href="intent:unwalled.garden/view-profile?url=${encodeURIComponent(this.userUrl)}"><img class="profile" src="/img/tmp-profile.png"></a>
        </header>
        <main>
          <img class="brand" src="/vendor/beaker-app-stdlib/img/beaker-logo.png">
          <search-control @submit-query=${this.onSubmitQuery} query=${this.query}></search-control>
        </main>
      </div>
    `
  }

  renderWithQuery () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <header>
        <img class="brand" src="/vendor/beaker-app-stdlib/img/beaker-logo.png">
        <search-control @submit-query=${this.onSubmitQuery} query=${this.query}></search-control>
        <div class="spacer"></div>
        <a @click=${this.onClickAppMenu}><span class="fas fa-th"></span></a>
        <a class="todo"><span class="fas fa-bell"></span></a>
        <a href="intent:unwalled.garden/view-profile?url=${encodeURIComponent(this.userUrl)}"><img class="profile" src="/img/tmp-profile.png"></a>
      </header>
      <nav>
        <category-nav current-tab=${this.category} @change-tab=${this.onSetCategory}></category-nav>
      </nav>
      <div class="search-controls">
        <div>${this.results.length} ${pluralize(this.results.length, 'result')} found.</div>
        <filters-dropdown selected=${this.hops} .choices=${this.hopsFilterChoices} @select=${this.onSelectHopsFilter}></filters-dropdown>
        <filters-dropdown selected=${this.since} .choices=${this.sinceFilterChoices} @select=${this.onSelectSinceFilter}></filters-dropdown>
      </div>
      <main>
        <div class="search-results-column">
          <search-results .results=${this.results} highlight-nonce="${this.highlightNonce}"></search-results>
          ${this.renderOtherEngines()}
        </div>
        <div class="search-sidebar-column">
        </div>
      </main>
    `
  }

  renderOtherEngines () {
    return html`
      <div class="other-engines">
        <p>Try your search on other engines:</p>
        <div class="other-engines-grid">
          <a class="link" href="https://duckduckgo.com${this.query ? '?q=' + encodeURIComponent(this.query) : ''}" target="_blank"><img src="/img/engines/duckduckgo.png"> DuckDuckGo</a>
          <a class="link" href="https://google.com/search${this.query ? '?q=' + encodeURIComponent(this.query) : ''}" target="_blank"><img src="/img/engines/google.png"> Google</a>
          <a class="link" href="https://en.wikipedia.org/wiki/Special:Search/${this.query ? '?q=' + encodeURIComponent(this.query) : ''}" target="_blank"><img src="/img/engines/wikipedia.png"> Wikipedia</a>
          <a class="link" href="https://twitter.com/search${this.query ? '?q=' + encodeURIComponent(this.query) : ''}" target="_blank"><img src="/img/engines/twitter.png"> Twitter</a>
          <a class="link" href="https://reddit.com/search${this.query ? '?q=' + encodeURIComponent(this.query) : ''}" target="_blank"><img src="/img/engines/reddit.png"> Reddit</a>
          <a class="link" href="https://www.youtube.com/results?search_query=${this.query ? '?q=' + encodeURIComponent(this.query) : ''}" target="_blank"><img src="/img/engines/youtube.png"> YouTube</a>
          <a class="link" href="https://github.com/search${this.query ? '?q=' + encodeURIComponent(this.query) : ''}" target="_blank"><img src="/img/engines/github.png"> GitHub</a>
        </div>
      </div>
    `
  }

  // event handlers
  // =

  async onSubmitQuery (e) {
    this.query = e.detail.query
  }

  onSetCategory (e) {
    this.category = e.detail.tab
  }

  onClickAppMenu (e) {
    e.preventDefault()
    e.stopPropagation()

    var rect = e.currentTarget.getClientRects()[0]
    var x = rect.right + 10
    var y = rect.top + e.currentTarget.offsetHeight
    appMenu.create({x, y, currentUserUrl: this.user.url})
  }

  onSelectHopsFilter (e) {
    this.hops = e.detail.choice
  }

  onSelectSinceFilter (e) {
    this.since = e.detail.choice
  }
}
Search.styles = searchMainCSS

customElements.define('search-main', Search)
