import { LitElement, html } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import { repeat } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import { unsafeHTML } from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/unsafe-html.js'
import { bookmarks } from '../tmp-beaker.js'
import { highlightSearchResult, toNiceUrl } from '/vendor/beaker-app-stdlib/js/strings.js'
import { timeDifference } from '/vendor/beaker-app-stdlib/js/time.js'
import { BeakerEditBookmarkPopup } from '/vendor/beaker-app-stdlib/js/com/popups/edit-bookmark.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import * as toast from '/vendor/beaker-app-stdlib/js/com/toast.js'
import searchResultsCSS from '../../css/com/search-results.css.js'

class SearchResults extends LitElement {
  static get properties () {
    return {
      highlightNonce: {type: String, attribute: 'highlight-nonce'},
      results: {type: Array},
      userUrl: {type: String, attribute: 'user-url'}
    }
  }

  constructor () {
    super()
    this.highlightNonce = ''
    this.results = []
    this.userUrl = ''
  }

  // rendering
  // =

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      ${repeat(this.results, result => this.renderResult(result))}
    `
  }

  renderResult (result) {
    switch (result.record.type) {
      case 'unwalled.garden/post':
        return this.renderPostResult(result)
      case 'unwalled.garden/bookmark':
        return this.renderBookmarkResult(result)
      default:
        return this.renderSiteResult(result)
    }
  }

  renderPostResult (result) {
    // NOTE
    // the post result uses the "link-result-wrapper" and overlay so that it can embed links within links
    // HTML doesn't allow <a> within <a>, so we use the overlay to position them visually
    // -prf
    return html`
      <div class="link-result-wrapper post">
        <a class="result post" href="${result.url}">
          <div class="result-thumb-placeholder"></div>
          <div class="result-details">
            <div class="post-body">${unsafeHTML(highlightSearchResult(result.content.body, this.highlightNonce))}</div>
            <div class="post-details-placeholder"></div>
          </div>
        </a>
        <div class="link-result-overlay">
          <div class="result-thumb">
            <a href="${result.record.author.url}"><img src="${result.record.author.url}/thumb"></a>
          </div>
          <div class="result-details">
            <div class="post-body-placeholder"></div>
            <div class="post-details">
              <a class="post-author" href="${result.record.author.url}">${result.record.author.title}</a>
              &middot;
              <span class="post-date">${timeDifference(result.createdAt)}</span>
            </div>
          </div>
        </div> 
      </div>
    `
  }

  renderBookmarkResult (result) {
    const isOwner = this.userUrl === result.record.author.url
    return html`
      <div class="result bookmark">
        <div class="result-details">
          <div class="title">
            <a href="${result.content.href}">
              ${unsafeHTML(highlightSearchResult(result.content.title, this.highlightNonce))}
            </a>
          </div>
          <div class="bookmark-details">
            <span class="fa fa-star"></span> by
            <a class="bookmark-author" href="${result.record.author.url}">${result.record.author.title}</a>
            <span class="bookmark-date">${timeDifference(result.createdAt)}</span>
            ${isOwner
              ? html`<a class="bookmark-admin-btn" @click=${e => this.onClickBookmarkAdmin(e, result)}><span class="fas fa-ellipsis-h"></span></a>`
              : ''}
          </div>
          <div class="bookmark-description">
            ${unsafeHTML(highlightSearchResult(result.content.description, this.highlightNonce))}
          </div>
          <div class="url">${result.content.href}</div>
          <div class="bookmark-tags">${unsafeHTML(highlightSearchResult(result.content.tags, this.highlightNonce))}</div>
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

  onClickBookmarkAdmin (e, result) {
    e.preventDefault()
    e.stopPropagation()
    const rect = e.currentTarget.getClientRects()[0]
    contextMenu.create({
      x: rect.left,
      y: rect.bottom,
      items: [
        {icon: 'fa fa-pencil-alt', label: 'Edit', click: () => this.onEditBookmark(result)},
        {icon: 'fa fa-trash', label: 'Delete', click: () => this.onDeleteBookmark(result)}
      ],
      fontAwesomeCSSUrl: '/vendor/beaker-app-stdlib/css/fontawesome.css'
    })
  }

  async onEditBookmark (result) {
    try {
      // render popup
      let original = await bookmarks.get(result.content.href)
      var b = await BeakerEditBookmarkPopup.create(original, {
        fontawesomeSrc: '/vendor/beaker-app-stdlib/css/fontawesome.css'
      })
      
      // make update
      await bookmarks.edit(result.content.href, b)
      Object.assign(result.content, b)
      result.content.tags = result.content.tags.join(' ')
      this.requestUpdate()
    } catch (e) {
      // ignore
      console.log(e)
    }
  }

  async onDeleteBookmark (result) {
    let b = await bookmarks.get(result.content.href)
    await bookmarks.remove(b.href)
    var i = this.results.indexOf(result)
    this.results.splice(i, 1)
    this.requestUpdate()

    const undo = async () => {
      await bookmarks.add(b)
      this.results.splice(i, 0, result)
      this.requestUpdate()
    }

    toast.create('Bookmark deleted', '', 10e3, {label: 'Undo', click: undo})
  }
}
SearchResults.styles = searchResultsCSS

customElements.define('search-results', SearchResults)