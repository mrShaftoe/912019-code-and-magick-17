'use strict';

window.onError = (function () {
  var setup = document.querySelector('.setup');
  var setupSubmit = setup.querySelector('.setup-submit');

  return {
    onError: function (message, errorMessage) {
      var errorDiv = document.createElement('div');
      errorDiv.innerText = message + errorMessage;
      errorDiv.classList.add('error');
      setup.appendChild(errorDiv);
      setTimeout(function () {
        setup.removeChild(errorDiv);
      }, 10000);
    },

    onSaveError: function (message) {
      window.onError.onError('Ошибка отправки формы. ', message);
      setupSubmit.disabled = true;
      setTimeout(function () {
        setupSubmit.disabled = false;
      }, 10000);
    }
  };
})();
