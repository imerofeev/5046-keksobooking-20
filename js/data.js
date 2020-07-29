'use strict';

(function () {
  var MAIN_PIN_CIRCLE = 65;
  var MAIN_PIN_HALF_CIRCLE = 33;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  function getAddress(xPin, yPin) {
    var inputAddress = adForm.querySelector('#address');
    var left = mapPinMain.style.left;
    var top = mapPinMain.style.top;
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
  };
})();
