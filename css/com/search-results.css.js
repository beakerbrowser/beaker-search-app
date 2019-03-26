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

.result-thumb,
.result-thumb-placeholder {
  width: 50px;
  margin-right: 16px;
}

.result-thumb img {
  display: block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
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

.post-body,
.post-body-placeholder {
  padding: 0 0 10px;
  font-size: 16px;
  height: 46px; /* has to be fixed height for the overlay to position correctly against it */
}

.post-author,
.link-author {
  color: var(--blue);
}

.post-author:hover,
.link-author:hover {
  text-decoration: underline;
}

.post-date,
.link-date {
  color: var(--color-text--muted);
}

.post-details-placeholder {
  height: 16px;
}

/* this weird link-result-wrapper and overlay are a solution to having the whole result
   be a link while also having links inside it */

.link-result-wrapper {
  position: relative;
}

.link-result-overlay {
  display: flex;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
}

.link-result-wrapper.post .link-result-overlay {
  padding: 16px;
}

.bookmark .url,
.bookmark-description,
.bookmark-details,
.bookmark-tags {
  margin-bottom: 2px;
}

.bookmark-details,
.bookmark-tags {
  color: gray;
  font-size: 12px;
}

`
export default cssStr