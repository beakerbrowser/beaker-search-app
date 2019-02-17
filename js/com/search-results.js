import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import searchResultsCSS from '../../css/com/search-results.css.js'

class SearchResults extends LitElement {
  static get properties () {
    return {
      results: {type: Array}
    }
  }

  constructor () {
    super()
    this.results = []
  }

  render() {
    return html`
      <div class="result">
        <div class="result-details">
          <div class="title"><a>Beaker Browser</a></div>
          <div class="url">dat://beakerbrowser.com</div>
          <div class="desc">An experimental peer-to-peer browser.</div>
        </div>
      </div>
      <div class="result">
        <div class="result-thumb">
          <a><img src="/img/beaker-logo.png"></a>
        </div>
        <div class="result-details">
          <div class="title"><a>Beaker Browser</a></div>
          <div class="url">dat://beakerbrowser.com</div>
          <div class="desc">An experimental peer-to-peer browser.</div>
        </div>
      </div>
      <div class="result">
        <div class="result-details">
          <div class="title"><a>Beaker Browser</a></div>
          <div class="url">dat://beakerbrowser.com</div>
          <div class="desc">An experimental peer-to-peer browser.</div>
        </div>
      </div>
    `
  }
}
SearchResults.styles = searchResultsCSS

customElements.define('search-results', SearchResults)