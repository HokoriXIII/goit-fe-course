"use strict";

var urlform = document.querySelector('.url-form');
var input = document.querySelector('.url-input');
var urllist = document.querySelector('.url-list');
var urls = [];
urlform.addEventListener('submit', addUrl);
urllist.addEventListener('click', delUrl);

function renderList() {
  if (localStorage.getItem('urls')) {
    urllist.innerHTML = '';
    urls = JSON.parse(localStorage.getItem('urls'));
    var source = document.querySelector('#url-template').innerHTML.trim();
    var template = Handlebars.compile(source);
    urllist.innerHTML = urls.reduce(function (acc, url) {
      return acc + template(url);
    }, '');
  }
}

function addUrl(e) {
  e.preventDefault();
  console.log(input.value);
  var dublicate = urls.some(function (item) {
    return item.url === urlform.url.value;
  });

  if (!dublicate) {
    if (urlform.url.value !== '') {
      urls.unshift({
        url: urlform.url.value
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
  var target = e.target;
  if (target.tagName != 'BUTTON') return;
  urls = urls.filter(function (item) {
    return item.url !== target.previousElementSibling.innerHTML;
  });
  localStorage.setItem('urls', JSON.stringify(urls));
  renderList();
}

window.onload = function () {
  renderList();
};