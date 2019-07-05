'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');

  /**
  * Функция создания DOM элемента, содержащего разметку персонажа
  * @param {object} wizard объект, содержащий данные персонажа
  * @return {object} similarWizard, DOM-элемент
  */
  var renderWizard = function (wizard) {
    var similarWizard = wizardTemplate.cloneNode(true);
    similarWizard.querySelector('.setup-similar-label').innerText = wizard.name;
    similarWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    similarWizard.querySelector('.wizard-eyes').style.fill = wizard.ColorEyes;
    return similarWizard;
  };

  window.renderSimilarWizard = function (obj) {
    return renderWizard(obj);
  };
})();
