'use strict';

(function () {
  var X_MAIN_PIN = 65;
  var Y_MAIN_PIN = 84;
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');

  function onPinsRender(cards) {
    window.map.dataPins = cards;

    window.filter.updatePins(window.map.dataPins);

    filters.classList.remove('mapFiltersForm--disabled');
  }

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.util.ENTER_KEY) {
      var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPin.length === 0) {
        map.classList.remove('map--faded');
        window.form.adProfile.classList.remove('ad-form--disabled');
        window.util.deleteAttribute(window.form.adProfileFieldset, 'disabled');
        window.server.download(onPinsRender, window.form.onError);

        window.data.getAddress(X_MAIN_PIN, Y_MAIN_PIN);
      }
    }
  }

  window.data.pinMain.addEventListener('mousedown', activePage);
  window.data.pinMain.addEventListener('keydown', activePage);

  window.map = {
    X_MAIN_PIN: X_MAIN_PIN,
    Y_MAIN_PIN: Y_MAIN_PIN,
    container: map,
    filters: filters,
    activePage: activePage
  };
})();
