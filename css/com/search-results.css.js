import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

.result {
  display: flex;
  margin-bottom: 30px;
  font-size: 14px;
}

.result a {
  cursor: pointer;
}

.result-thumb {
  width: 50px;
  margin-right: 16px;
}

.result-thumb img {
  display: block;
  width: 50px;
  height: 50px;
}

.title {
  color: var(--blue);
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 2px;
}

.title:hover {
  text-decoration: underline;
}

.url {
  color: green;
}
`
export default cssStr