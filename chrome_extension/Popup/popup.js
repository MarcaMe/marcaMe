/* global chrome */

window.addEventListener('load', function () {
  chrome.tabs.getSelected(null, function (tab) {
    const title = document.getElementById('article-title');
    title.innerHTML = tab.title;

    var destroy = document.getElementsByClassName('destroy');
    let status = document.getElementById('status');

    document.getElementById('addBtn').addEventListener('click', event => {
      event.preventDefault();
      var li = document.createElement('a');
      var inputValue = document.getElementById('myInput').value;
      var text = document.createTextNode(inputValue);
      li.appendChild(text);

      if (status.innerHTML === 'Tags must contain text!') status.innerHTML = '';

      if (inputValue === '') {
        status.innerHTML = 'Tags must contain text!';
      } else {
        document.getElementById('myUL').appendChild(li);
        li.className = 'ui label tags';
      }
      document.getElementById('myInput').value = '';

      var aTag = document.createElement('a');
      var txt = document.createTextNode('  \u00D7');
      aTag.className = 'destroy tag-style';
      aTag.appendChild(txt);
      li.appendChild(aTag);

      for (let i = 0; i < destroy.length; i++) {
        destroy[i].onclick = function () {
          var div = this.parentElement;
          div.style.display = 'none';
        }
      }
    })

    document.getElementById('save').addEventListener('click', event => {
      event.preventDefault();
      let allTags = document.getElementsByClassName('tags');

      let data = {
        url: tab.url,
        tags: Array.from(allTags).map(tag => tag.innerText).join(',')
      };

      $.ajax('http://localhost:8080/api/contents/chrome', {
        type: 'POST',
        data
      })
        .done(() => {
          chrome.tabs.query({ title: 'MarcaMe' }, marca => {
            chrome.tabs.reload(marca[0].id);
          });
        })
        .fail(response => console.log('ERROR', response));
    });


  });
});
