'use strict';

var WizardData = {
  NAMES: ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'],
  SURNAMES: ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'],
  COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
  EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
  FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
};

var SIMILAR_WIZARD_COUNT = 4;
var similarList = document.querySelector('.setup-similar-list');
var setupOpen = document.querySelector('.setup-open');
var setup = window.setupToggle.setup;
var setupClose = setup.querySelector('.setup-close');
var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');
var wizardCoatInput = setup.querySelector('.setup-player [name="coat-color"]');
var wizardEyesInput = setup.querySelector('.setup-player [name="eyes-color"]');
var fireballColor = setup.querySelector('.setup-player [name="fireball-color"]');

var fragment = document.createDocumentFragment();
for (var i = 0; i < SIMILAR_WIZARD_COUNT; i++) {
  fragment.appendChild(window.renderSimilarWizard(WizardData));
}
similarList.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');

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

