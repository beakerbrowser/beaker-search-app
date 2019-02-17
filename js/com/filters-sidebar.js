import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {classMap} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import {repeat} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import filtersSidebarCSS from '../../css/com/filters-sidebar.css.js'

class FiltersSidebar extends LitElement {
  constructor () {
    super()
  }

  get hopsChoices () {
    return [
      {id: 'all', label: 'All of your network'},
      {id: 'followed', label: 'Followed users'}
    ]
  }

  get timeChoices () {
    return [
      {id: 'all', label: 'All time'},
      {id: 'day', label: 'Past day'},
      {id: 'week', label: 'Past week'},
      {id: 'month', label: 'Past month'},
      {id: 'year', label: 'Past year'}
    ]
  }

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <h5>Filters</h5>
      <filters-sidebar-group selected="all" .choices=${this.hopsChoices}></filters-sidebar-group>
      <filters-sidebar-group selected="all" .choices=${this.timeChoices}></filters-sidebar-group>
    `
  }

}
FiltersSidebar.styles = filtersSidebarCSS

class FiltersSidebarGroup extends LitElement {
  static get properties () {
    return {
      selected: {type: String, reflect: true}
    }
  }

  constructor () {
    super()
  }

  createRenderRoot() {
    return this // dont use the shadow dom, let FiltersSidebar style us
  }

  render () {
    return html`<ul>${repeat(this.choices, choice => this.renderChoice(choice))}</ul>`
  }

  renderChoice (choice) {
    const cls = classMap({active: this.selected === choice.id})
    return html`
      <li class="${cls}">
        <span class="fas fa-check"></span>
        <a>${choice.label}</a>
      </li>`
  }
}

customElements.define('filters-sidebar', FiltersSidebar)
customElements.define('filters-sidebar-group', FiltersSidebarGroup)