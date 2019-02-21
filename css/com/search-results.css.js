import {css} from '/vendor/beaker-app-stdlib/vendor/lit-element/lit-element.js'
import commonCSS from '/vendor/beaker-app-stdlib/css/common.css.js'

const cssStr = css`
${commonCSS}

.result {
  display: flex;
  margin-bottom: 30px;
  font-size: 14px;
}

.result.post {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 16px;
  cursor: pointer;
}

.result.post:hover {
  border-color: #bbb;
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
  border-radius: 50%;
}

.result-details {
  flex: 1;
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

.post-body {
  padding: 0 0 10px;
  font-size: 16px;
}

.post-author {
  color: var(--blue);
}

.post-author:hover {
  text-decoration: underline;
}

.post-date {
  color: var(--color-text--muted);
}
`
export default cssStr