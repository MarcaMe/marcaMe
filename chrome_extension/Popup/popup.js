/* global chrome */

window.addEventListener('load', function () {
  chrome.tabs.getSelected(null, function (tab) {
    const title = document.getElementById('article-title');
    title.innerHTML = tab.title;

    var destroy = document.getElementsByClassName('destroy');
    let status = document.getElementById('status');

    document.getElementById('myInput').addEventListener('keypress', event => {
      console.log(event.keyCode)
      if (event.keyCode === 13 || event.which === 13) {
      event.preventDefault();
      var li = document.createElement('a');
      var inputValue = document.getElementById('myInput').value;
      var text = document.createTextNode(inputValue);
      li.appendChild(text);


      if (inputValue === '') {
        const messages = ['Don\'t forget to enter tags!', 'Press Add to Submit']
        const getRandomMessage = () => {
          return Math.floor(Math.random() * (2 - 0) + 0)
        }
        status.innerHTML = messages[getRandomMessage()];
        setTimeout(() => {
          status.innerHTML = ''
        }, 2000)
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
      }
    })

      let saveButton = document.getElementById('save');
      saveButton.addEventListener('click', event => {
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
          chrome.tabs.query({ title: 'marca!' }, marca => {
            chrome.tabs.reload(marca[0].id);
            saveButton.innerHTML = 'Saved!'
            setTimeout(() => {
              saveButton.innerHTML = 'Add Bookmark'
            }, 2000)
          });
        })
        .fail(response => {
          saveButton.innerHTML = 'Error Saving!'
          console.log('ERROR', response)
          setTimeout(() => {
            saveButton.innerHTML = 'Add Bookmark'
          }, 2000)
        });
    });
  });
});
