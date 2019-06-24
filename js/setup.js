'use strict';

(function () {
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
  var setupOpen = document.querySelector('.setup-open');
  var setup = document.querySelector('.setup');
  var setupDefaultCoords = {};
  var setupClose = setup.querySelector('.setup-close');
  var username = setup.querySelector('.setup-user-name');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var wizardCoatInput = setup.querySelector('.setup-player [name="coat-color"]');
  var wizardEyesInput = setup.querySelector('.setup-player [name="eyes-color"]');
  var fireballColor = setup.querySelector('.setup-player [name="fireball-color"]');

  /**
   * Функция создания объекта, содержащего данные персонажа
   * @return {object} объект, содержащий данные персонажа
   */
  var createWizardData = function () {
    return {
      'name': window.utils.getRandomElement(NAMES) + ' ' + window.utils.getRandomElement(SURNAMES),
      'coatColor': window.utils.getRandomElement(COAT_COLORS),
      'eyesColor': window.utils.getRandomElement(EYES_COLORS)
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

  /**
   * Функция показа скрытого окна setup
   */
  var openSetup = function () {
    setup.classList.remove('hidden');
    setupDefaultCoords = {
      x: setup.offsetLeft,
      y: setup.offsetTop
    };
    document.addEventListener('keydown', onSetupEscPress);
  };

  /**
   * Функция скрытия окна setup
   */
  var closeSetup = function () {
    setup.classList.add('hidden');
    document.removeEventListener('keydown', onSetupEscPress);
    setup.style.left = setupDefaultCoords.x + 'px';
    setup.style.top = setupDefaultCoords.y + 'px';
  };

  /**
   * Функция скрытия окна setup при нажатии на клавишу ESC
   * @param {object} evt событие
   */
  var onSetupEscPress = function (evt) {
    if (window.utils.isEscEvent(evt)) {
      if (username === document.activeElement) {
        return;
      }
      closeSetup();
    }
  };

  var fragment = document.createDocumentFragment();

  for (var i = 0; i < 4; i++) {
    wizardsData.push(createWizardData());
  }

  for (i = 0; i < wizardsData.length; i++) {
    fragment.appendChild(renderWizard(wizardsData[i]));
  }

  similarList.appendChild(fragment);
  document.querySelector('.setup-similar').classList.remove('hidden');

  setupOpen.addEventListener('click', function () {
    openSetup();
  });

  setupOpen.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterEvent(evt)) {
      openSetup();
    }
  });

  setupClose.addEventListener('click', function () {
    closeSetup();
  });

  setupClose.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterEvent(evt)) {
      closeSetup();
    }
  });

  wizardCoat.addEventListener('click', function () {
    window.utils.colorize(COAT_COLORS, wizardCoat, wizardCoatInput);
  });

  wizardEyes.addEventListener('click', function () {
    window.utils.colorize(EYES_COLORS, wizardEyes, wizardEyesInput);
  });

  wizardFireball.addEventListener('click', function () {
    window.utils.colorize(FIREBALL_COLORS, wizardFireball, fireballColor);
  });
})();
