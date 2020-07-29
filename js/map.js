'use strict';

(function () {
  var X_MAIN_PIN = 65;
  var Y_MAIN_PIN = 84;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');

  function pinSuccessHandler(cards) {
    var sortedCards = cards.filter(function (card) {
      var shouldPresent = true;

      if (typeof card.offer === 'undefined' || card.offer === '') {
        shouldPresent = false;
      }

      return shouldPresent;
    });
    window.pin.renderPins(sortedCards);
  }

  function pinErrorHandler(errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('map', node);
  }

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.utils.ENTER_KEY) {
      var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPin.length === 0) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        mapFiltersForm.classList.remove('mapFiltersForm--disabled');
        window.form.deleteAttribute(adFormFieldset, 'disabled');

        window.backend.load(window.backend.Url.GET_CARDS, window.backend.Method.GET, pinSuccessHandler, pinErrorHandler);

        window.data.getAddress(X_MAIN_PIN, Y_MAIN_PIN);
      }
    }
  }

  mapPinMain.addEventListener('mousedown', activePage);
  mapPinMain.addEventListener('keydown', activePage);

  window.map = {
    X_MAIN_PIN: X_MAIN_PIN,
    Y_MAIN_PIN: Y_MAIN_PIN,
    map: map,
    mapPinMain: mapPinMain,
    activePage: activePage,
  };
})();
