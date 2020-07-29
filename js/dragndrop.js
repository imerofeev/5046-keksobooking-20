'use strict';

(function () {
  window.map.mapPinMain.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      evt.preventDefault();

      var startCoordinates = {
        x: evt.clientX,
        y: evt.clientY
      };

      var dragger = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        dragger = true;


        var limits = {
          top: 130 - window.map.Y_MAIN_PIN,
          right: Math.round(1200 - window.map.X_MAIN_PIN / 2),
          bottom: 630 - window.map.Y_MAIN_PIN,
          left: 0 - Math.floor(window.map.X_MAIN_PIN / 2)
        };

        var shift = {
          x: startCoordinates.x - moveEvt.clientX,
          y: startCoordinates.y - moveEvt.clientY
        };

        var left = window.map.mapPinMain.offsetLeft - shift.x;
        var top = window.map.mapPinMain.offsetTop - shift.y;

        startCoordinates = {
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

        window.map.mapPinMain.style.left = left + 'px';
        window.map.mapPinMain.style.top = top + 'px';
        window.data.getAddress(window.map.X_MAIN_PIN, window.map.Y_MAIN_PIN);
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        if (dragger === true) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();
            window.map.mapPinMain.removeEventListener('click', onClickPreventDefault);
          };
          window.map.mapPinMain.addEventListener('click', onClickPreventDefault);
        }
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });
})();
