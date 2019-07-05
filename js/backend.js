'use strict';

window.backend = (function () {
  var LOAD_URL = 'https://js.dump.academy/code-and-magick';
  var SAVE_URL = 'https://js.dump.academy/code-and-magick/data';

  var createXhr = function (xhr, url, type, onLoad, onError) {
    xhr.responseType = 'json';
    xhr.timeout = 10000;
    xhr.open(type, url);
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onLoad(xhr.response);
      } else {
        onError('Код ошибки: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + ' мс');
    });
  };

  return {
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      createXhr(xhr, LOAD_URL, 'POST', onLoad, onError);
      xhr.send(data);
    },

    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      createXhr(xhr, SAVE_URL, 'GET', onLoad, onError);
      xhr.send();
    }
  };
})();
