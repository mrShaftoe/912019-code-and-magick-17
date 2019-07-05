'use strict';

window.onSuccess = (function () {
  var SIMILAR_WIZARD_COUNT = 4;
  var similarList = document.querySelector('.setup-similar-list');

  return {
    save: function (evt) {
      window.backend.save(
          new FormData(evt.target),
          function () {
            window.setupToggle.closeSetup();
          },
          window.onError.onSaveError);
      evt.preventDefault();
    },
    load: function (response) {
      var fragment = document.createDocumentFragment();
      for (var i = 0; i < SIMILAR_WIZARD_COUNT; i++) {
        fragment.appendChild(window.renderSimilarWizard(response[i]));
      }
      similarList.appendChild(fragment);
      document.querySelector('.setup-similar').classList.remove('hidden');
    }
  };
})();
