import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  font-size: 14px;
}

button {
  border: 0;
  outline: 0;
  color: #777;
  cursor: pointer;
  padding: 4px;
  border-radius: 4px;
  font-size: 13px;
}

button:hover {
  background: #f5f5f5;
}
`
export default cssStr