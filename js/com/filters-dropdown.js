import {LitElement, html} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import {repeat} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-html/directives/repeat.js'
import * as contextMenu from '/vendor/beaker-app-stdlib/js/com/context-menu.js'
import filtersDropdownCSS from '../../css/com/filters-dropdown.css.js'

class FiltersDropdown extends LitElement {
  static get properties () {
    return {
      selected: {type: String, reflect: true}
    }
  }

  constructor () {
    super()
    this.selected = ''
  }

  get selectedChoice () {
    return this.choices.find(c => c.id === this.selected)
  }

  // rendering
  // =

  render () {
    return html`
      <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
      <button @click=${this.onClickBtn}>${this.selectedChoice.label} <span class="fas fa-caret-down"></span></button>
    `
  }

  onClickBtn (e) {
    e.preventDefault()
    e.stopPropagation()
    const rect = e.currentTarget.getClientRects()[0]
    contextMenu.create({
      x: rect.left,
      y: rect.bottom,
      render: () => html`
        <link rel="stylesheet" href="/vendor/beaker-app-stdlib/css/fontawesome.css">
        <div class="dropdown-items left roomy" style="box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2)">
          ${repeat(this.choices, choice => this.renderChoice(choice))}
        </div>
      `
    })
  }

  // <ul></ul>
  renderChoice (choice) {
    const iconStyle = `margin-right: 5px; visibility: ${this.selected === choice.id ? 'visible' : 'hidden'}`
    return html`
      <a class="dropdown-item" @click=${e => this.onClickChoice(e, choice)}>
        <span class="fas fa-check" style="${iconStyle}"></span>
        ${choice.label}
      </a>
    `
  }

  // events
  // =

  onClickChoice (e, choice) {
    contextMenu.destroy()
    this.selected = choice.id
    this.dispatchEvent(new CustomEvent('select', {detail: {choice: choice.id}}))
  }
}
FiltersDropdown.styles = filtersDropdownCSS

customElements.define('filters-dropdown', FiltersDropdown)