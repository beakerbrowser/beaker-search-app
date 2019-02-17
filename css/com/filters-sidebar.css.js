import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
:host {
  display: block;
  color: #777;
  font-size: 14px;
}

h5 {
  margin: 0 0 15px;
}

ul {
  list-style: none;
  margin: 0 0 15px;
  padding: 0;
}

li {
  margin: 0 0;
}

a {
  cursor: pointer;
}

a:hover {
  text-decoration: underline;
}

.fa-check {
  visibility: hidden;
  margin-right: 5px;
}

li.active .fa-check {
  visibility: visible;
}
`
export default cssStr