/* global chrome */

window.addEventListener('load', function () {
  chrome.tabs.getSelected(null, function (tab) {
    const title = document.getElementById('article-title');
    title.innerHTML = tab.title;

    document.getElementById('addbookmark').addEventListener('submit', (e) => {
      e.preventDefault();
      let data = {
        url: tab.url,
        tags: document.getElementById('tags').value
      }

      $.ajax('http://localhost:8080/api/contents/chrome', {
        type: 'POST',
        data
      })
        .done(response => {
          chrome.tabs.query({ title: 'MarcaMe' }, (tab) => {
            chrome.tabs.reload(tab[0].id);
          });
        })
        .fail(response => console.log('ERROR'));
    });
  });
});
