'use strict';

(function () {
  var setup = document.querySelector('.setup');
  var shop = setup.querySelector('.setup-artifacts-shop');
  var goods = shop.querySelectorAll('img');
  var dropzone = setup.querySelector('.setup-artifacts');
  var dragObj = null;

  var addDragstartListener = function (obj) {
    obj.addEventListener('dragstart', function () {
      dragObj = obj;
    });
  };

  for (var i = 0; i < goods.length; i++) {
    /* goods[i].addEventListener('dragstart', function () {
      dragObj = goods[i];
    }); */
    addDragstartListener(goods[i]);
  }

  var onItemDrop = function (evt) {
    evt.preventDefault();
    dragObj.parentNode.removeChild(dragObj);
    evt.target.appendChild(dragObj);
  };

  dropzone.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  dropzone.addEventListener('drop', onItemDrop);

  shop.addEventListener('dragover', function (evt) {
    evt.preventDefault();
  });

  shop.addEventListener('drop', onItemDrop);
})();
