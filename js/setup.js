'use strict';
var NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var wizardTemplate = document.querySelector('#similar-wizard-template')
    .content
    .querySelector('.setup-similar-item');
var similarList = document.querySelector('.setup-similar-list');
var wizardsData = [];

document.querySelector('.setup').classList.remove('hidden');

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
