import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
header {
  display: flex;
  background: #f7f7f7;
  height: 50px;
  padding: 10px 20px;
  align-items: center;
}

header img.brand {
  width: 50px;
  height: 50px;
  margin-right: 20px;
}

header search-control {
  width: 600px;
  height: 40px;
}

header .spacer {
  flex: 1;
}

header a {
  margin-right: 30px;
  font-size: 18px;
  font-weight: 300;
  color: #555;
  text-decoration: none;
  cursor: pointer;
}

header img.profile {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.15);
}

nav {
  background: #f7f7f7;
  padding: 0 90px;
  height: 40px;
  border-bottom: 1px solid #ddd;
}

.num-results {
  color: #777;
  background: #fff;
  padding: 22px 90px;
}

main {
  display: flex;
  padding: 0 90px;
}

main search-results {
  width: 600px;
  margin-right: 50px;
}

.other-engines {
  width: 600px;
  padding: 30px 90px;
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
  color: var(--color-text);
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