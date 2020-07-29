'use strict';

(function () {
  var X_MAIN_PIN = 65;
  var Y_MAIN_PIN = 84;
  var main = document.querySelector('main');
  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var mapFilters = map.querySelector('.map__filters-container');
  var mapFiltersForm = mapFilters.querySelector('.map__filters');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var error = document.querySelector('#error').content;
  var errorElement = error.querySelector('.error');
  var errorContent = errorElement.querySelector('.error__message');
  var errorButton = errorElement.querySelector('.error__button');

  function pinSuccessHandler(cards) {
    window.map.dataPins = cards;

    window.filter.updatePins(window.map.dataPins);

    mapFiltersForm.classList.remove('mapFiltersForm--disabled');
  }

  function errorHandler(errorMessage) {
    main.appendChild(errorElement);
    errorContent.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorElement);

    errorButton.addEventListener('click', function () {
      window.util.closePopup(errorElement);
    });
    errorElement.addEventListener('click', function () {
      window.util.closePopup(errorElement);
    });
    document.addEventListener('keydown', function (evt) {
      window.util.onPopupEscPress(evt, function () {
        window.util.closePopup(errorElement);
      });
    });
  }

  function activePage(evt) {
    if (evt.button === 0 || evt.key === window.util.ENTER_KEY) {
      var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');

      if (mapPin.length === 0) {
        map.classList.remove('map--faded');
        adForm.classList.remove('ad-form--disabled');
        window.form.deleteAttribute(adFormFieldset, 'disabled');

        window.server.download(pinSuccessHandler, errorHandler);

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
    mapFiltersForm: mapFiltersForm,
    mapPinMain: mapPinMain,
    activePage: activePage,
    errorHandler: errorHandler,
  };
})();
