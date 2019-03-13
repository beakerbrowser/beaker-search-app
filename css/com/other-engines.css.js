import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
.other-engines {
  width: 600px;
  color: #777;
}

.other-engines-grid {
  display: inline-grid;
  grid-template-columns: repeat(7, 1fr);
}

.other-engines-grid a {
  display: inline-block;
  padding: 15px 18px;

  /* remove link styles */
  color: inherit;
  text-decoration: none;

  line-height: 24px; /* same height as the image */
}

.other-engines-grid a:hover {
  background: #eee;
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