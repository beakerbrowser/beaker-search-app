import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {classMap} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/class-map.js'
import {repeat} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import filtersGroupCSS from '../../css/com/filters-group.css.js'

class FiltersGroup extends LitElement {
  static get properties () {
    return {
      selected: {type: String, reflect: true}
    }
  }

  constructor () {
    super()
    this.selected = ''
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <ul>${repeat(this.choices, choice => this.renderChoice(choice))}</ul>
    `
  }

  renderChoice (choice) {
    const cls = classMap({active: this.selected === choice.id})
    return html`
      <li class="${cls}" @click=${e => this.onClickChoice(e, choice)}>
        <span class="fas fa-check"></span>
        <a>${choice.label}</a>
      </li>`
  }

  // events
  // =

  onClickChoice (e, choice) {
    this.selected = choice.id
    this.dispatchEvent(new CustomEvent('select', {detail: {choice: choice.id}}))
  }
}
FiltersGroup.styles = filtersGroupCSS

customElements.define('filters-group', FiltersGroup)