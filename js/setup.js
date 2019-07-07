'use strict';


var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupSubmit = setup.querySelector('.setup-submit');
var form = setup.querySelector('form');
var setupClose = setup.querySelector('.setup-close');

var onError = function (message) {
  window.utils.createErrorWindow(message);
  setupSubmit.disabled = false;
};

// Открытие окна setup по клику на иконке
setupOpen.addEventListener('click', function () {
  window.setupToggle.openSetup();
});

// Открытие окна setup по нажатию Enter на иконке в фокусе
setupOpen.addEventListener('keydown', function (evt) {
  if (window.utils.isEnterEvent(evt)) {
    window.setupToggle.openSetup();
  }
});

// Закрытие окна setup по клику на иконке закрытия
setupClose.addEventListener('click', function () {
  window.setupToggle.closeSetup();
});

// Закрытие окна setup по нажатию Enter на иконке закрытия в фокусе
setupClose.addEventListener('keydown', function (evt) {
  if (window.utils.isEnterEvent(evt)) {
    window.setupToggle.closeSetup();
  }
});

form.addEventListener('submit', function (evt) {
  setupSubmit.disabled = true;
  window.backend.save(
      new FormData(form),
      function () {
        window.setupToggle.closeSetup();
        setupSubmit.disabled = false;
      },
      onError);
  evt.preventDefault();
});

