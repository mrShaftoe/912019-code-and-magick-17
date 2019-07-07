'use strict';

(function () {
  var SIMILAR_COUNT = 4;
  var WizardData = {
    COAT_COLORS: ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'],
    EYES_COLORS: ['black', 'red', 'blue', 'yellow', 'green'],
    FIREBALL_COLORS: ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'],
  };
  var setup = document.querySelector('.setup');
  var wizardCoat = setup.querySelector('.setup-wizard .wizard-coat');
  var wizardCoatInput = setup.querySelector('.setup-player [name="coat-color"]');
  var wizardEyes = setup.querySelector('.setup-wizard .wizard-eyes');
  var wizardEyesInput = setup.querySelector('.setup-player [name="eyes-color"]');
  var wizardFireball = setup.querySelector('.setup-fireball-wrap');
  var fireballInput = setup.querySelector('.setup-player [name="fireball-color"]');
  var wizards = [];

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === wizardCoatInput.value) {
      rank += 2;
    }
    if (wizard.colorEyes === wizardEyesInput.value) {
      rank += 1;
    }

    return rank;
  };

  var namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  var updateWizards = function () {
    window.render(wizards.slice().sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        rankDiff = namesComparator(left.name, right.name);
      }
      return rankDiff;
    }), SIMILAR_COUNT);
  };

  var onLoad = function (response) {
    wizards = response;
    updateWizards();
  };

  wizardCoat.addEventListener('click', function () {
    window.utils.colorize(WizardData.COAT_COLORS, wizardCoat, wizardCoatInput);
    window.debounce(updateWizards);
  });

  wizardEyes.addEventListener('click', function () {
    window.utils.colorize(WizardData.EYES_COLORS, wizardEyes, wizardEyesInput);
    window.debounce(updateWizards);
  });

  wizardFireball.addEventListener('click', function () {
    window.utils.colorize(WizardData.FIREBALL_COLORS, wizardFireball, fireballInput);
  });

  window.backend.load(onLoad, window.utils.createErrorWindow);
})();
