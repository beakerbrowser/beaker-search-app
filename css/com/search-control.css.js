import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'
import searchInputCSS from '/vendor/beaker-app-stdlib/css/com/search-input.css.js'

const cssStr = css`
${commonCSS}
${searchInputCSS}

.search-container {
  position: relative;
}

input.search {
  font-size: 15px;
}

input.search::-webkit-input-placeholder {
  font-size: 0.9rem;
}

i.fa-search {
  top: 12px;
}
`
export default cssStr