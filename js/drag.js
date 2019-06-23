'use strict';

var setup = document.querySelector('.setup');
var shop = setup.querySelector('.setup-artifacts-shop');
var goods = shop.querySelectorAll('img');
var dropzone = setup.querySelector('.setup-artifacts');
var dragObj;

var addDragstartListener = function (obj) {
  obj.addEventListener('dragstart', function () {
    dragObj = obj;
  });
};

var onItemDrop = function (evt) {
  evt.preventDefault();
  dragObj.parentNode.removeChild(dragObj);
  evt.target.appendChild(dragObj);
};

for (var i = 0; i < goods.length; i++) {
  addDragstartListener(goods[i]);
}

dropzone.addEventListener('dragover', function (evt) {
  evt.preventDefault();
});

dropzone.addEventListener('drop', onItemDrop);

shop.addEventListener('dragover', function (evt) {
  evt.preventDefault();
});

shop.addEventListener('drop', onItemDrop);


