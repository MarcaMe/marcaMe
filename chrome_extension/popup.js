function addBookmark(url) {
  // const status = document.getElementById('status-display')

  let data = {
    url
    // summary: document.getElementById('summary').value,
    // tags: document.getElementById('tags').value
  };

  return fetch('http://localhost:8080/api/contents/chrome', {
    method: 'POST',
    body: JSON.stringify(data),
    headers: { 'Content-Type': 'application/json' }
  })
}

window.addEventListener('load', function () {
  chrome.tabs.getSelected(null, function (tab) {
    document.getElementById('addbookmark').addEventListener('submit', () => { addBookmark(tab.url) })
  });
});
