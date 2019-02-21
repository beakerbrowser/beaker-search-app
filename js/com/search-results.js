import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {repeat} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import {unsafeHTML} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/unsafe-html.js'
import {highlightSearchResult, toNiceUrl} from '/vendor/beaker-app-stdlib/js/strings.js'
import {timeDifference} from '/vendor/beaker-app-stdlib/js/time.js'
import {findParent} from '/vendor/beaker-app-stdlib/js/dom.js'
import searchResultsCSS from '../../css/com/search-results.css.js'

class SearchResults extends LitElement {
  static get properties () {
    return {
      highlightNonce: {type: String, attribute: 'highlight-nonce'},
      results: {type: Array}
    }
  }

  constructor () {
    super()
    this.highlightNonce = ''
    this.results = []
  }

  // rendering
  // =

  render() {
    return html`
      ${repeat(this.results, result => this.renderResult(result))}
    `
  }

  renderResult (result) {
    switch (result.record.type) {
      case 'unwalled.garden/post':
        return this.renderPostResult(result)
      default:
        return this.renderSiteResult(result)
    }
  }

  renderPostResult (result) {
    return html`
      <div
        class="result post"
        data-href="dat://feed/?view=${encodeURIComponent(result.url)}"
        @mousedown=${this.onClickPostResult}
      >
        <div class="result-thumb">
          <a href="${result.record.author.url}"><img src="${result.record.author.url}/thumb"></a>
        </div>
        <div class="result-details">
          <div class="post-body">${unsafeHTML(highlightSearchResult(result.content.body, this.highlightNonce))}</div>
          <div class="post-details">
            <a class="post-author"  href="${result.record.author.url}">${result.record.author.title}</a>
            &middot;
            <span class="post-date">${timeDifference(result.createdAt)}</span>
          </div>
        </div>
      </div>
    `
  }

  renderSiteResult (result) {
    return html`
      <div class="result site">
        <div class="result-thumb">
          <a href="${result.url}"><img src="${result.url}/thumb"></a>
        </div>
        <div class="result-details">
          <div class="title"><a href="${result.url}">${unsafeHTML(highlightSearchResult(result.title, this.highlightNonce))}</a></div>
          <div class="url">${toNiceUrl(result.url)}</div>
          <div class="desc">${unsafeHTML(highlightSearchResult(result.description, this.highlightNonce))}</div>
        </div>
      </div>
    `
  }

  // events
  // =

  onClickPostResult (e) {
    if (findParent(e.target, el => el.tagName === 'A')) {
      // ignore, user clicked on a link inside the post result
      return
    }

    var popup = e.metaKey || e.ctrlKey || e.button === 1
    if (popup) window.open(e.currentTarget.dataset.href)
    else window.location = e.currentTarget.dataset.href
  }
}
SearchResults.styles = searchResultsCSS

customElements.define('search-results', SearchResults)