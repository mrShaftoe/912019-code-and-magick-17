'use strict';

window.setupToggle = (function () {
  var setup = document.querySelector('.setup');
  var username = setup.querySelector('.setup-user-name');
  var setupDefaultCoords = {};
  var setupSubmit = setup.querySelector('.setup-submit');
  return {
    /**
     * Функция показа скрытого окна setup
     */
    openSetup: function () {
      setup.classList.remove('hidden');
      setupDefaultCoords = {
        x: setup.offsetLeft,
        y: setup.offsetTop
      };
      window.backend.load(
          window.onSuccess.load,
          function (message) {
            window.onError.onError('Ошибка получения данных. ', message);
          }
      );
      document.addEventListener('keydown', this.onSetupEscPress);
    },

    /**
     * Функция скрытия окна setup
     */
    closeSetup: function () {
      setup.classList.add('hidden');
      document.removeEventListener('keydown', this.onSetupEscPress);
      var errorMsg = document.querySelector('.error');
      if (errorMsg) {
        setup.removeChild(errorMsg);
        setupSubmit.disabled = false;
      }
      setup.style.left = setupDefaultCoords.x + 'px';
      setup.style.top = setupDefaultCoords.y + 'px';
    },

    /**
     * Функция скрытия окна setup при нажатии на клавишу ESC
     * @param {object} evt событие
     */
    onSetupEscPress: function (evt) {
      if (window.utils.isEscEvent(evt)) {
        if (username === document.activeElement) {
          return;
        }
        window.setupToggle.closeSetup();
      }
    }
  };
})();
