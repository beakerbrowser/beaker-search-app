import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import headerCSS from './com/header.css.js'
import otherEnginesCSS from './com/other-engines.css.js'

const cssStr = css`
${headerCSS}
${otherEnginesCSS}

:host {
  --gray-bg: #f7f7f7;
}

nav {
  background: var(--gray-bg);
  padding: 0 90px;
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.search-controls {
  display: flex;
  align-items: center;
  color: #777;
  background: #fff;
  margin: 16px 90px 24px;
}

.search-controls > * {
  margin-right: 14px;
}

main {
  display: flex;
  padding: 0 90px;
}

main .search-results-column {
  width: 600px;
  margin-right: 50px;
}

div.noquery-container {
  background: var(--gray-bg);
  height: 100vh;
}

div.noquery-container main {
  width: 600px;
  margin: 0 auto;
  position: relative;
  top: 30%;
  align-items: center;
}

div.noquery-container img.brand {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

div.noquery-container search-control {
  width: 600px;
  height: 40px;
}
`
export default cssStr