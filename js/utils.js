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
    }
  };
})();
