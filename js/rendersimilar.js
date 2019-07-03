'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  /**
  * Функция создания объекта, содержащего данные персонажа
  * @param {object} obj объект, содержащий исходные данные для генерации персонажа
  * @return {object} объект, содержащий данные персонажа
  */
  var createWizardData = function (obj) {
    return {
      'name': window.utils.getRandomElement(obj.NAMES) + ' ' + window.utils.getRandomElement(obj.SURNAMES),
      'coatColor': window.utils.getRandomElement(obj.COAT_COLORS),
      'eyesColor': window.utils.getRandomElement(obj.EYES_COLORS)
    };
  };

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

  window.renderSimilarWizard = function (obj) {
    return renderWizard(createWizardData(obj));
  };
})();
