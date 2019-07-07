'use strict';
window.utils = (function () {
  var ESC_KEY_CODE = 27;
  var ENTER_KEY_CODE = 13;

  return {
    isEnterEvent: function (evt) {
      return evt.keyCode === ENTER_KEY_CODE;
    },

    isEscEvent: function (evt) {
      return evt.keyCode === ESC_KEY_CODE;
    },

    getRandomElement: function (arr) {
      return arr[Math.floor(Math.random() * arr.length)];
    },

    colorize: function (colors, elem, input) {
      input.value = this.getRandomElement(colors);
      if (elem.tagName.toLowerCase() === 'div') {
        elem.style.backgroundColor = input.value;
      } else {
        elem.style.fill = input.value;
      }
    },

    fadeOut: function (elem, interval) {
      if (+elem.style.opacity > 0.1) {
        elem.style.opacity -= 0.01;
      } else {
        if (elem) {
          elem.parentNode.removeChild(elem);
        }
        clearInterval(interval);
      }
    },

    createErrorWindow: function (message) {
      var errorWindow = document.querySelector('.error') || document.createElement('div');
      errorWindow.innerText = 'Ошибка загрузки данных. ' + message;
      errorWindow.classList.add('error');
      errorWindow.style.opacity = 1;
      document.body.appendChild(errorWindow);
      setTimeout(function () {
        var interval = setInterval(function () {
          window.utils.fadeOut(errorWindow, interval);
        }, 60);
      }, 3000);
    }
  };
})();
