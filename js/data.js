'use strict';

(function () {
  var TYPEHOUSE = ['palace', 'flat', 'house', 'bungalo'];
  var TIME = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var TITLE = ['title-1', 'title-2', 'title-3', 'title-4', 'title-5', 'title-6', 'title-7', 'title-8'];
  var DESCRIPTION = ['description-1', 'description-2', 'description-3', 'description-4', 'description-5', 'description-6', 'description-7', 'description-8'];
  var MAIN_PIN_CIRCLE = 65;
  var MAIN_PIN_HALF_CIRCLE = 33;
  var X_OTHER_PIN = 50;
  var Y_OTHER_PIN = 70;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');

  function getCards(numberOfCards) {
    var cards = [];
    var location;

    for (var i = 0; i < numberOfCards; i++) {
      location = {
        x: window.utils.getRandElement(0, 1200 - (X_OTHER_PIN / 2)),
        y: window.utils.getRandElement(130 - Y_OTHER_PIN, 630 - Y_OTHER_PIN)
      };

      cards[i] = {
        author: {
          avatar: 'img/avatars/user0' + (i + 1) + '.png'
        },
        offer: {
          title: window.utils.getRandElementArr(TITLE),
          address: (location.x + (X_OTHER_PIN / 2)) + ', ' + (location.y + Y_OTHER_PIN),
          price: window.utils.getRandElement(1000, 100000),
          type: window.utils.getRandElementArr(TYPEHOUSE),
          rooms: window.utils.getRandElement(1, 3),
          guests: window.utils.getRandElement(1, 3),
          checkin: window.utils.getRandElementArr(TIME),
          checkout: window.utils.getRandElementArr(TIME),
          features: window.utils.getRandLengthArr(FEATURES),
          description: window.utils.getRandElementArr(DESCRIPTION),
          photos: window.utils.getRandLengthArr(PHOTOS)
        },
        location: location
      };
    }
    return cards;
  }

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
    getCards: getCards,
    getAddress: getAddress,
  };
})();
