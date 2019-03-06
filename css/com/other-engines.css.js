import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
.other-engines {
  width: 600px;
  margin: 60px 0;
  color: #777;
}

.other-engines-grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}

.other-engines-grid a {
  display: inline-block;
  border: 1px solid #ddd;
  padding: 15px 20px;

  /* remove link styles */
  color: inherit;
  text-decoration: none;

  line-height: 24px; /* same height as the image */
}

.other-engines-grid a:hover {
  border-color: #ccc;
  background: #fafafa;
}

.other-engines-grid a img {
  width: 24px;
  height: 24px;
  vertical-align: middle;

  /* vertical align is always a few px off */
  position: relative;
  top: -2px;
}
`
export default cssStr