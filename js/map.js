'use strict';

(function () {
  var COUNTCARDS = 8;
  var X_MAIN_PIN = 65;
  var Y_MAIN_PIN = 84;
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var cardsData = window.data.getCards(COUNTCARDS);

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.utils.ENTER_KEY) {
      var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPin.length === 0) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        mapFiltersForm.classList.remove('mapFiltersForm--disabled');
        window.form.deleteAttribute(adFormFieldset, 'disabled');
        window.pin.renderPins(cardsData);
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
    activePage: activePage
  };
})();
