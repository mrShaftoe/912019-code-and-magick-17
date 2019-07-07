'use strict';

(function () {
  var wizardTemplate = document.querySelector('#similar-wizard-template')
      .content
      .querySelector('.setup-similar-item');
  var similarList = document.querySelector('.setup-similar-list');

  /**
  * Функция создания DOM элемента, содержащего разметку персонажа
  * @param {object} wizard объект, содержащий данные персонажа
  * @return {object} similarWizard, DOM-элемент
  */
  var renderWizard = function (wizard) {
    var similarWizard = wizardTemplate.cloneNode(true);
    similarWizard.querySelector('.setup-similar-label').innerText = wizard.name;
    similarWizard.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    similarWizard.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;
    return similarWizard;
  };

  window.render = function (obj, size) {
    var fragment = document.createDocumentFragment();
    var similarLength = obj.length > size ? size : obj.length;
    for (var i = 0; i < similarLength; i++) {
      fragment.appendChild(renderWizard(obj[i]));
    }
    similarList.innerHTML = '';
    similarList.appendChild(fragment);
    document.querySelector('.setup-similar').classList.remove('hidden');
  };
})();
