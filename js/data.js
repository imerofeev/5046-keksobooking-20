'use strict';

(function () {
  var MAIN_PIN_X = 65;
  var MAIN_PIN_Y = 84;
  var MAIN_PIN_HALF_CIRCLE = 33;
  var LEFT_X_MAP = 0;
  var RIGHT_X_MAP = 1200;
  var TOP_Y_MAP = 130;
  var BOTTOM_Y_MAP = 630;
  var pinMain = document.querySelector('.map__pin--main');
  var inputAddress = document.querySelector('#address');

  function getAddress(xPin, yPin) {
    var left = pinMain.style.left;
    var top = pinMain.style.top;
    var xLocation = Math.floor(Number(left.replace('px', '')) + Math.floor(xPin / 2));
    var yLocation = Math.floor(Number(top.replace('px', '')) + yPin);

    xLocation = (left <= LEFT_X_MAP) ? LEFT_X_MAP : xLocation;
    xLocation = (left >= RIGHT_X_MAP) ? RIGHT_X_MAP : xLocation;
    yLocation = (top <= TOP_Y_MAP) ? TOP_Y_MAP : yLocation;
    yLocation = (top >= BOTTOM_Y_MAP) ? BOTTOM_Y_MAP : yLocation;

    inputAddress.value = (xLocation + ', ' + yLocation);

    return xLocation + ', ' + yLocation;
  }

  getAddress(MAIN_PIN_X, MAIN_PIN_HALF_CIRCLE);

  window.data = {
    getAddress: getAddress,
    pinMain: pinMain,
    MAIN_PIN_X: MAIN_PIN_X,
    MAIN_PIN_Y: MAIN_PIN_Y,
    MAIN_PIN_HALF_CIRCLE: MAIN_PIN_HALF_CIRCLE,
    LEFT_X_MAP: LEFT_X_MAP,
    RIGHT_X_MAP: RIGHT_X_MAP,
    TOP_Y_MAP: TOP_Y_MAP,
    BOTTOM_Y_MAP: BOTTOM_Y_MAP
  };
})();
