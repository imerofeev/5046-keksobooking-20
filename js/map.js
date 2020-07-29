'use strict';

(function () {
  var map = document.querySelector('.map');
  var filters = document.querySelector('.map__filters');
  var filterSelectors = document.querySelectorAll('.map__filter');
  var featuresFieldset = document.querySelector('.map__features');

  filters.classList.add('mapFiltersForm--disabled');
  window.util.addAttribute(filterSelectors, 'disabled');
  featuresFieldset.setAttribute('disabled', true);

  function loadPins(cards) {
    window.map.dataPins = cards;
    window.filter.updatePins(window.map.dataPins);
    filters.classList.remove('mapFiltersForm--disabled');
    window.util.deleteAttribute(filterSelectors, 'disabled');
    featuresFieldset.removeAttribute('disabled');
  }

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.util.ENTER_KEY) {
      map.classList.remove('map--faded');
      window.form.adProfile.classList.remove('ad-form--disabled');
      window.util.deleteAttribute(window.form.adProfileFieldset, 'disabled');
      window.server.download(onSuccessDownload, window.form.onError);
      window.data.getAddress(window.data.MAIN_PIN_X, window.data.MAIN_PIN_Y);
    }

    window.data.pinMain.removeEventListener('mousedown', onMouseDownMainPin);
    window.data.pinMain.removeEventListener('keydown', onKeyDownMainPin);
  }

  function onSuccessDownload(cards) {
    loadPins(cards);
  }

  function onMouseDownMainPin(evt) {
    activePage(evt);
  }

  function onKeyDownMainPin(evt) {
    activePage(evt);
  }

  window.data.pinMain.addEventListener('mousedown', onMouseDownMainPin);
  window.data.pinMain.addEventListener('keydown', onKeyDownMainPin);

  window.map = {
    container: map,
    filters: filters,
    filterSelectors: filterSelectors,
    featuresFieldset: featuresFieldset,
    onMouseDownMainPin: onMouseDownMainPin
  };
})();
