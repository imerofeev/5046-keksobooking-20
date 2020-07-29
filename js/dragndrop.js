'use strict';

(function () {
  function onClickPreventDefault(clickEvt) {
    clickEvt.preventDefault();
    window.data.pinMain.removeEventListener('click', onClickPreventDefault);
  }

  function onMouseMove(moveEvt) {
    var limits = {
      top: window.data.TOP_Y_MAP - window.data.MAIN_PIN_Y,
      right: Math.round(window.data.RIGHT_X_MAP - window.data.MAIN_PIN_X / 2),
      bottom: window.data.BOTTOM_Y_MAP - window.data.MAIN_PIN_Y,
      left: window.data.LEFT_X_MAP - Math.floor(window.data.MAIN_PIN_X / 2)
    };
    var shift = {
      x: window.dragndrop.startCoords.x - moveEvt.clientX,
      y: window.dragndrop.startCoords.y - moveEvt.clientY
    };
    var left = window.data.pinMain.offsetLeft - shift.x;
    var top = window.data.pinMain.offsetTop - shift.y;

    moveEvt.preventDefault();
    window.dragndrop.isDragger = true;

    window.dragndrop.startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    if (left > limits.right) {
      left = limits.right;
    } else if (left < limits.left) {
      left = limits.left;
    }

    if (top < limits.top) {
      top = limits.top;
    } else if (top > limits.bottom) {
      top = limits.bottom;
    }

    window.data.pinMain.style.left = left + 'px';
    window.data.pinMain.style.top = top + 'px';
    window.data.getAddress(window.data.MAIN_PIN_X, window.data.MAIN_PIN_Y);
  }

  function onMouseUp(upEvt) {
    upEvt.preventDefault();

    if (window.dragndrop.isDragger === true) {
      window.data.pinMain.addEventListener('click', onClickPreventDefault);
    }

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }

  window.data.pinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      window.dragndrop.startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      window.dragndrop.isDragger = false;

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  window.dragndrop = {};
})();
