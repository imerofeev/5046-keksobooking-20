'use strict';

(function () {
  var StatusCode = {
    OK: 200
  };

  var Url = {
    GET_CARDS: 'https://javascript.pages.academy/keksobooking/data',
    SEND_FORM: 'https://javascript.pages.academy/keksobooking'
  };

  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  var TIMEOUT_IN_MS = 10000;
  function load(url, method, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Произошла ошибка. Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);

    return xhr;
  }

  function download(onSuccess, onError) {
    var xhr = load(Url.GET_CARDS, Method.GET, onSuccess, onError);
    xhr.send();
    return xhr;
  }

  function save(data, onSuccess, onError) {
    var xhr = load(Url.SEND_FORM, Method.POST, onSuccess, onError);
    xhr.send(data);
  }

  window.server = {
    Method: Method,
    Url: Url,
    load: load,
    download: download,
    save: save
  };
})();
