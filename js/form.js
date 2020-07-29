'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var RoomsForGuests = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var TimeKey = {
    '12:00': ['12:00'],
    '13:00': ['13:00'],
    '14:00': ['14:00']
  };
  var HousingPrice = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var titleInput = adForm.querySelector('#title');
  var priceInput = adForm.querySelector('#price');
  var typeHouse = adForm.querySelector('#type');
  var rooms = adForm.querySelector('#room_number');
  var guests = adForm.querySelector('#capacity');
  var ckeckin = adForm.querySelector('#timein');
  var ckeckout = adForm.querySelector('#timeout');
  var success = document.querySelector('#success').content;
  var successElement = success.querySelector('.success');

  function getValidElement(evt, selectFirst, selectSecond, objectKeys) {
    var el = (typeof evt === 'undefined') ? selectFirst : evt.currentTarget;
    var validElem = objectKeys[el.value];
    var selectSecondOption = selectSecond.querySelectorAll('option');

    if (selectSecondOption) {
      for (var i = 0; i < selectSecondOption.length; i++) {
        var optionElem = selectSecondOption[i];

        optionElem.disabled = (validElem.indexOf(optionElem.value) === -1) ? true : false;
      }
      selectSecond.querySelector('option[value="' + validElem[0] + '"]').selected = true;
    }
  }

  function addAttribute(tagList, attributeName) {
    if (tagList) {
      for (var i = 0; i < tagList.length; i++) {
        tagList[i].setAttribute(attributeName, 'true');
      }
    }
  }

  function deleteAttribute(tagList, attributeName) {
    if (tagList) {
      for (var i = 0; i < tagList.length; i++) {
        tagList[i].removeAttribute(attributeName);
      }
    }
  }

  function formSuccessHandler() {
    var mapPin = window.map.map.querySelectorAll('.map__pin:not(.map__pin--main)');

    window.map.map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    window.map.mapFiltersForm.classList.add('mapFiltersForm--disabled');
    addAttribute(adFormFieldset, 'disabled');
    main.appendChild(successElement);
    adForm.reset();
    window.map.mapPinMain.style.left = '570px';
    window.map.mapPinMain.style.top = '375px';
    document.addEventListener('keydown', function (evt) {
      window.util.onPopupEscPress(evt, function () {
        window.util.closePopup(successElement);
      });
    });
    document.addEventListener('click', function () {
      window.util.closePopup(successElement);
    });
    for (var i = 0; i < mapPin.length; i++) {
      mapPin[i].remove();
    }
  }

  adForm.addEventListener('submit', function (evt) {
    window.server.save(new FormData(adForm), formSuccessHandler, window.map.errorHandler);
    evt.preventDefault();
  });

  getValidElement(undefined, rooms, guests, RoomsForGuests);
  addAttribute(adFormFieldset, 'disabled');

  titleInput.addEventListener('input', function (evt) {
    var target = evt.target;

    switch (true) {
      case target.value.length < MIN_TITLE_LENGTH:
        target.setCustomValidity('Минимальная длина заголовка ' + MIN_TITLE_LENGTH + ' символов');
        break;
      case target.value.length > MAX_TITLE_LENGTH:
        target.setCustomValidity('Максимальная длина заголовка ' + MAX_TITLE_LENGTH + ' символов');
        break;
      default:
        target.setCustomValidity('');
        break;
    }
  });

  titleInput.addEventListener('invalid', function () {

    switch (true) {
      case titleInput.validity.tooShort:
        titleInput.setCustomValidity('Минимальная длина заголовка 30 символов');
        break;
      case titleInput.validity.tooLong:
        titleInput.setCustomValidity('Максимальная длина заголовка 100 символов');
        break;
      case titleInput.validity.valueMissing:
        titleInput.setCustomValidity('Обязательное поле');
        break;
      default:
        titleInput.setCustomValidity('');
        break;
    }
  });

  typeHouse.addEventListener('change', function (evt) {
    var target = evt.target;

    priceInput.placeholder = HousingPrice[target.value];
    priceInput.min = HousingPrice[target.value];
  });

  priceInput.addEventListener('input', function (evt) {
    var target = evt.target;
    var min = target.getAttribute('min');

    switch (true) {
      case min === 0 && target.value < 0:
        target.setCustomValidity('Минимальная цена за ночь 0 рублей');
        break;
      case min === 1000 && target.value < 1000:
        target.setCustomValidity('Минимальная цена за ночь 1000 рублей');
        break;
      case min === 5000 && target.value < 50000:
        target.setCustomValidity('Минимальная цена за ночь 5000 рублей');
        break;
      case min === 10000 && target.value < 10000:
        target.setCustomValidity('Минимальная цена за ночь 10000 рублей');
        break;
      case target.value > 1000000:
        target.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
        break;
      default:
        target.setCustomValidity('');
        break;
    }
  });

  priceInput.addEventListener('invalid', function () {
    var min = priceInput.getAttribute('min');

    switch (true) {
      case priceInput.validity.rangeOverflow:
        priceInput.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
        break;
      case priceInput.validity.rangeUnderflow:
        priceInput.setCustomValidity('Минимальная цена за ночь ' + min + ' рублей');
        break;
      default:
        priceInput.setCustomValidity('Обязательное поле');
        break;
    }
  });

  rooms.addEventListener('change', function (evt) {
    getValidElement(evt, rooms, guests, RoomsForGuests);
  });
  ckeckin.addEventListener('change', function (evt) {
    getValidElement(evt, ckeckin, ckeckout, TimeKey);
  });

  window.form = {
    deleteAttribute: deleteAttribute
  };
})();
