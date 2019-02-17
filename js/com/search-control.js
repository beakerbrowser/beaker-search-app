import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import searchControlCSS from '../../css/com/search-control.css.js'

class SearchControl extends LitElement {
  static get properties () {
    return {
      query: {type: String, reflected: true}
    }
  }

  constructor () {
    super()
    this.query = ''
  }

  render() {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <div class="search-container">
        <input autofocus @keyup=${this.onKeyupInput} placeholder="Search your network" class="search" value=${this.query} />
        <i class="fa fa-search"></i>
      </div>
    `
  }

  onKeyupInput (e) {
    this.query = e.currentTarget.value
  }
}
SearchControl.styles = searchControlCSS

customElements.define('search-control', SearchControl)