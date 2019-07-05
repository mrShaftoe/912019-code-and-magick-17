'use strict';

(function () {
  var createParagraph = function (message) {
    var paragraph = document.createElement('p');
    paragraph.innerText = message;
    return paragraph;
  };

  window.onError = function (message) {
    var errorDiv = document.createElement('div');
    errorDiv.appendChild(createParagraph('При отправке формы произошла ошибка'));
    errorDiv.appendChild(createParagraph(message));
    errorDiv.classList.add('error');
    document.body.appendChild(errorDiv);
  };
})();
