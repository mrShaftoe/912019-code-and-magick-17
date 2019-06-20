'use strict';

var setup = document.querySelector('.setup');
var upload = setup.querySelector('.upload');
var goods = setup.querySelectorAll('.setup-artifacts-shop img');
upload.addEventListener('mousedown', function (evt) {
  evt.preventDefault();
  var startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  var dragged = false;

  var onMouseMove = function (moveEvt) {
    dragged = true;
    moveEvt.preventDefault();
    var shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    setup.style.top = (setup.offsetTop - shift.y) + 'px';
    setup.style.left = (setup.offsetLeft - shift.x) + 'px';
  };

  var onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    if (dragged) {
      var onClickPreventDefault = function (dragEvt) {
        dragEvt.preventDefault();
        upload.removeEventListener('click', onClickPreventDefault);
      };

      upload.addEventListener('click', onClickPreventDefault);
    }
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  };

  document.addEventListener('mousemove', onMouseMove);
  document.addEventListener('mouseup', onMouseUp);
});

var goodDrag = function (good) {
  var goodObj = {};

  var getDroppableNode = function (evt) {
    good.hidden = true;
    var droppableNode = document.elementFromPoint(evt.clientX, evt.clientY).closest('[dropzone="move"]');
    good.hidden = false;
    return droppableNode;
  };

  var onMouseDown = function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    goodObj.x = good.offsetLeft;
    goodObj.y = good.offsetTop;

    var onMouseMove = function (moveEvt) {
      good.style.position = 'absolute';
      good.style.zIndex = '1000';
      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: startCoords.x - shift.x,
        y: startCoords.y - shift.y
      };

      good.style.left = (good.offsetLeft - shift.x) + 'px';
      good.style.top = (good.offsetTop - shift.y) + 'px';
    };

    var onMouseUp = function (downEvt) {
      downEvt.preventDefault();
      var targetNode = getDroppableNode(downEvt);
      if (!targetNode) {
        good.style.left = goodObj.x + 'px';
        good.style.top = goodObj.y + 'px';
      } else {
        for (var i = 0; i < targetNode.children.length; i++) {
          if (!targetNode.children[i].hasChildNodes()) {
            targetNode.children[i].appendChild(good);
            good.removeEventListener('mousedown', onMouseDown);
            break;
          }
        }
      }

      good.style.position = 'static';

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  good.addEventListener('mousedown', onMouseDown);
};

for (var i = 0; i < goods.length; i++) {
  goodDrag(goods[i]);
}
