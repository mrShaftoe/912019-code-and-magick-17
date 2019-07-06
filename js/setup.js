'use strict';

var WizardData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
};

var SIMILAR_WIZARD_COUNT = 4;
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupSubmit = setup.querySelector('.setup-submit');
var similarList = setup.querySelector('.setup-similar-list');
var form = setup.querySelector('form');
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardCoatInput = setup.querySelector('.setup-player [name="coat-color"]');
var wizardEyesInput = setup.querySelector('.setup-player [name="eyes-color"]');
var fireballColor = setup.querySelector('.setup-player [name="fireball-color"]');

var fadeOut = function (elem, interval) {
  if (+elem.style.opacity > 0.1) {
    elem.style.opacity -= 0.01;
  } else {
    elem.parentNode.removeChild(elem);
    clearInterval(interval);
  }
};

var onError = function (message) {
  var errorWindow = setup.querySelector('.error') || document.createElement('div');
  errorWindow.innerText = 'Ошибка загрузки данных. ' + message;
  errorWindow.classList.add('error');
  errorWindow.style.opacity = 1;
  document.body.appendChild(errorWindow);
  setTimeout(function () {
    var interval = setInterval(function () {
      fadeOut(errorWindow, interval);
    }, 60);
  }, 3000);
  setupSubmit.disabled = false;
};

var onLoad = function (response) {
  var fragment = document.createDocumentFragment();
  var similarLength = response.length > SIMILAR_WIZARD_COUNT ? SIMILAR_WIZARD_COUNT : response.length;
  for (var i = 0; i < similarLength; i++) {
    fragment.appendChild(window.renderSimilarWizard(response[i]));
  }
  similarList.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');
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

// Изменение цвета на случайный по клику на соответствующем элементе волшебника
wizardCoat.addEventListener('click', function () {
  window.utils.colorize(WizardData.COAT_COLORS, wizardCoat, wizardCoatInput);
});

wizardEyes.addEventListener('click', function () {
  window.utils.colorize(WizardData.EYES_COLORS, wizardEyes, wizardEyesInput);
});

wizardFireball.addEventListener('click', function () {
  window.utils.colorize(WizardData.FIREBALL_COLORS, wizardFireball, fireballColor);
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
window.backend.load(onLoad, onError);
