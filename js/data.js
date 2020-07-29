'use strict';

(function () {
  var MAIN_PIN_CIRCLE = 65;
  var MAIN_PIN_HALF_CIRCLE = 33;

  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  function getAddress(xPin, yPin) {
    var left = pinMain.style.left;
    var top = pinMain.style.top;
    var xLocation = Math.floor(Number(left.replace('px', '')) + Math.floor(xPin / 2));
    var yLocation = Math.floor(Number(top.replace('px', '')) + yPin);

    xLocation = (left <= 0) ? 0 : xLocation;
    xLocation = (left >= 1200) ? 1200 : xLocation;
    yLocation = (top <= 130) ? 130 : yLocation;
    yLocation = (top >= 630) ? 630 : yLocation;

    inputAddress.value = (xLocation + ', ' + yLocation);

    return xLocation + ', ' + yLocation;
  }

  getAddress(MAIN_PIN_CIRCLE, MAIN_PIN_HALF_CIRCLE);

  window.data = {
    getAddress: getAddress,
    pinMain: pinMain,
    MAIN_PIN_X: MAIN_PIN_CIRCLE,
    MAIN_PIN_Y: MAIN_PIN_HALF_CIRCLE
  };
})();
