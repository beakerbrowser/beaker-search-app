import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'

const cssStr = css`
header {
  display: flex;
  background: var(--gray-bg);
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

header a:hover {
  color: #777;
}

header a.todo {
  cursor: default;
  color: #aaa;
}

header a.todo:hover {
  position: relative;
}

header a.todo:hover:after {
  content: 'TODO';
  position: absolute;
  left: -10px;
  top: 2px;
  font-size: 12px;
  font-weight: bold;
  color: #222;
  text-shadow: 0 0 3px #fff;
}

header img.profile {
  border-radius: 50%;
  width: 40px;
  height: 40px;
  box-shadow: inset 0 2px 3px rgba(0,0,0,.15);
}
`
export default cssStr