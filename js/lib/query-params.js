export function setParams (kv) {
  var url = (new URL(window.location))
  for (var k in kv) {
    url.searchParams.set(k, kv[k])
  }
  window.history.pushState({}, null, url)
}

export function getParam (k, fallback = '') {
  return (new URL(window.location)).searchParams.get(k) || fallback
}