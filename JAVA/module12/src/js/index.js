const urlform = document.querySelector('.url-form');
const input = document.querySelector('.url-input');
const urllist = document.querySelector('.url-list');
let urls = [];

urlform.addEventListener('submit', addUrl);
urllist.addEventListener('click', delUrl);

function renderList() {
  if (localStorage.getItem('urls')) {
    urllist.innerHTML = '';
    urls = JSON.parse(localStorage.getItem('urls'));
    const source = document.querySelector('#url-template').innerHTML.trim();
    const template = Handlebars.compile(source);
    urllist.innerHTML = urls.reduce((acc, url) => acc + template(url), '');
  }
}

function addUrl(e) {
  e.preventDefault();
  console.log(input.value);
  const dublicate = urls.some(item => item.url === urlform.url.value);

  if (!dublicate) {
    if (urlform.url.value !== '') {
      urls.unshift({
        url: urlform.url.value,
      });
      localStorage.setItem('urls', JSON.stringify(urls));
    }
  } else {
    alert('This url is exist!');
  }
  renderList();
  urlform.reset();
}

function delUrl(e) {
  const target = e.target;
  if (target.tagName != 'BUTTON') return;
  urls = urls.filter(
    item => item.url !== target.previousElementSibling.innerHTML,
  );
  localStorage.setItem('urls', JSON.stringify(urls));
  renderList();
}

window.onload = function() {
  renderList();
};
