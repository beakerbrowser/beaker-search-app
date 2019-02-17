import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
a {
  padding: 10px 20px;
  font-weight: 500;
  font-size: 14px;
  color: #777;
  border-bottom-width: 3px;
}
a.active {
  color: var(--blue);
}
`
export default cssStr