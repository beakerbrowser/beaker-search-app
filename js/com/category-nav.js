import {TabsNav} from '/vendor/beaker-app-stdlib/js/com/tabs-nav.js'
import tabsNavCSS from '/vendor/beaker-app-stdlib/css/com/tabs-nav.css.js'
import categoryNavCSS from '../../css/com/category-nav.css.js'

class CategoryNav extends TabsNav {
  get tabs () {
    return [
      {id: 'all', label: 'All'},
      {id: 'sites', label: 'Websites'},
      {id: 'posts', label: 'Posts'},
      {id: 'bookmarks', label: 'Bookmarks'}
    ]
  }
}
CategoryNav.styles = [tabsNavCSS, categoryNavCSS]
customElements.define('category-nav', CategoryNav)
