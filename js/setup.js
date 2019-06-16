'use strict';

/**
* Добавление похожих волшебников
*/

var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');
var wizardsData = [];

/**
 * Функция получения случайного элемента из массива строк
 * @param {object} arr массив строк
 * @return {string} строка, случайный элемент массива
 */
var getRandomElement = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

/**
 * Функция создания объекта, содержащего данные персонажа
 * @return {object} объект, содержащий данные персонажа
 */
var createWizardData = function () {
  return {
    'name': getRandomElement(NAMES) + ' ' + getRandomElement(SURNAMES),
    'coatColor': getRandomElement(COAT_COLORS),
    'eyesColor': getRandomElement(EYES_COLORS)
  };
};


for (var i = 0; i < 4; i++) {
  wizardsData.push(createWizardData());
}

/**
 * Функция создания DOM элемента, содержащего разметку персонажа
 * @param {object} wizard объект, содержащий данные персонажа
 * @return {object} similarWizard, DOM-элемент
 */
var renderWizard = function (wizard) {
  var similarWizard = wizardTemplate.cloneNode(true);
  similarWizard.querySelector('.setup-similar-label').innerText = wizard.name;
  similarWizard.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  similarWizard.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;
  return similarWizard;
};


var fragment = document.createDocumentFragment();
for (i = 0; i < wizardsData.length; i++) {
  fragment.appendChild(renderWizard(wizardsData[i]));
}

similarList.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');

/**
* Открытие и закрытие окна настроек персонажа (setup)
*/

var ESC_KEY_CODE = 27;
var ENTER_KEY_CODE = 13;
var setupOpen = document.querySelector('.setup-open');
var setup = document.querySelector('.setup');
var setupClose = setup.querySelector('.setup-close');
var username = setup.querySelector('.setup-user-name');

/**
 * Функция показа скрытого окна setup
 */
var openSetup = function () {
  setup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
  username.addEventListener('focus', onUsernameFocus);
  setupClose.addEventListener('keydown', onSetupCloseEnterPress);
  wizardCoat.addEventListener('click', onWizardCoatClick);
  wizardEyes.addEventListener('click', onWizardEyesClick);
  wizardFireball.addEventListener('click', onWizardFireballClick);
};

/**
 * Функция скрытия окна setup
 */
var closeSetup = function () {
  setup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
  username.removeEventListener('focus', onUsernameFocus);
  setupClose.removeEventListener('keydown', onSetupCloseEnterPress);
  wizardCoat.removeEventListener('click', onWizardCoatClick);
  wizardEyes.removeEventListener('click', onWizardEyesClick);
  wizardFireball.removeEventListener('click', onWizardFireballClick);
};

/**
 * Функция скрытия окна setup при нажатии на клавишу ESC
 * @param {object} evt событие
 */
var onSetupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEY_CODE) {
    closeSetup();
  }
};

/**
 * Функция скрытия окна setup нажатием клавиши Enter при фокусе на элементе setup-close
 * @param {object} evt событие
 */
var onSetupCloseEnterPress = function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    closeSetup();
  }
};


var onUsernameBlur = function () {
  document.addEventListener('keydown', onSetupEscPress);
};

var onUsernameFocus = function () {
  document.removeEventListener('keydown', onSetupEscPress);
  username.addEventListener('blur', onUsernameBlur);
};

setupOpen.addEventListener('click', function () {
  openSetup();
});

setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEY_CODE) {
    openSetup();
  }
});

setupClose.addEventListener('click', function () {
  closeSetup();
});

var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = setup.querySelector('.setup-fireball-wrap');

/**
 * Функция изменения цвета мантии волшебника
 */
var onWizardCoatClick = function () {
  var newColor = getRandomElement(COAT_COLORS);
  wizardCoat.style.fill = newColor;
  setup.querySelector('.setup-player [name="coat-color"]').value = newColor;
};

/**
 * Функция изменения цвета глаз волшебника
 */
var onWizardEyesClick = function () {
  var newColor = getRandomElement(EYES_COLORS);
  wizardEyes.style.fill = newColor;
  setup.querySelector('.setup-player [name="eyes-color"]').value = newColor;
};

/**
 * Функция изменения цвета фаербола волшебника
 */
var onWizardFireballClick = function () {
  var newColor = getRandomElement(FIREBALL_COLORS);
  wizardFireball.style.backgroundColor = newColor;
  setup.querySelector('.setup-player [name="fireball-color"]').value = newColor;
};

