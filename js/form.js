'use strict';

(function () {
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var MAIN_PIN_LOCATION_X = '570px';
  var MAIN_PIN_LOCATION_Y = '375px';
  var PRICE_FLAT_MIN = '1000';
  var AVATAR_SRC_DEFAULT = 'img/muffin-grey.svg';
  var roomsForGuestsMap = {
    '1': ['1'],
    '2': ['2', '1'],
    '3': ['3', '2', '1'],
    '100': ['0']
  };
  var timeKeyMap = {
    '12:00': ['12:00'],
    '13:00': ['13:00'],
    '14:00': ['14:00']
  };
  var housingPriceMap = {
    bungalo: '0',
    flat: '1000',
    house: '5000',
    palace: '10000'
  };
  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var adFormFieldset = adForm.querySelectorAll('fieldset');
  var title = adForm.querySelector('#title');
  var price = adForm.querySelector('#price');
  var typeHouse = adForm.querySelector('#type');
  var rooms = adForm.querySelector('#room_number');
  var guests = adForm.querySelector('#capacity');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var successTemplate = document.querySelector('#success').content;
  var successPopup = successTemplate.querySelector('.success');
  var errorTemplate = document.querySelector('#error').content;
  var errorPopup = errorTemplate.querySelector('.error');
  var errorContent = errorPopup.querySelector('.error__message');
  var errorButton = errorPopup.querySelector('.error__button');
  var resetButton = adForm.querySelector('.ad-form__reset');

  window.util.addAttribute(adFormFieldset, 'disabled');
  window.util.getValidElement(undefined, rooms, guests, roomsForGuestsMap);
  window.util.getValidElement(undefined, timeIn, timeOut, timeKeyMap);

  function lockForm() {
    adForm.classList.add('ad-form--disabled');
    window.util.addAttribute(adFormFieldset, 'disabled');
  }

  function resetValues() {
    adForm.reset();
    window.avatar.preview.src = AVATAR_SRC_DEFAULT;
    window.avatar.imageHousing.src = ' ';
    price.placeholder = 'от ' + PRICE_FLAT_MIN;
    price.min = PRICE_FLAT_MIN;
    window.util.getValidElement(undefined, rooms, guests, roomsForGuestsMap);
    window.util.getValidElement(undefined, timeIn, timeOut, timeKeyMap);
  }

  function resetMap() {
    window.map.container.classList.add('map--faded');
    window.card.close();
    window.pin.clear();
    window.map.filters.reset();
    window.map.filters.classList.add('mapFiltersForm--disabled');
    window.util.addAttribute(window.map.filterSelectors, 'disabled');
    window.map.featuresFieldset.setAttribute('disabled', true);
    window.data.getAddress(window.data.MAIN_PIN_X, window.data.MAIN_PIN_HALF_CIRCLE);
    window.data.pinMain.style.left = MAIN_PIN_LOCATION_X;
    window.data.pinMain.style.top = MAIN_PIN_LOCATION_Y;
    window.data.pinMain.addEventListener('mousedown', window.map.onMouseDownMainPin);
  }

  function resetPage() {
    resetMap();
    lockForm();
    resetValues();
  }

  function onClickResetForm() {
    resetPage();
  }

  function onSubmitForm() {
    resetPage();
    main.appendChild(successPopup);

    document.addEventListener('keydown', function (evt) {
      window.util.onPopupEscPress(evt, function () {
        window.util.closePopup(successPopup);
      });
    });

    document.addEventListener('click', function () {
      window.util.closePopup(successPopup);
    });
  }

  function onError(errorMessage) {
    main.appendChild(errorPopup);
    errorContent.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', errorPopup);

    errorButton.addEventListener('click', function () {
      window.util.closePopup(errorPopup);
    });

    errorPopup.addEventListener('click', function () {
      window.util.closePopup(errorPopup);
    });

    document.addEventListener('keydown', function (evt) {
      window.util.onPopupEscPress(evt, function () {
        window.util.closePopup(errorPopup);
      });
    });
  }

  title.addEventListener('input', function (evt) {
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

  title.addEventListener('invalid', function () {
    switch (true) {
      case title.validity.tooShort:
        title.setCustomValidity('Минимальная длина заголовка 30 символов');
        break;
      case title.validity.tooLong:
        title.setCustomValidity('Максимальная длина заголовка 100 символов');
        break;
      case title.validity.valueMissing:
        title.setCustomValidity('Обязательное поле');
        break;
      default:
        title.setCustomValidity('');
        break;
    }
  });

  typeHouse.addEventListener('change', function (evt) {
    var target = evt.target;

    price.placeholder = 'от ' + housingPriceMap[target.value];
    price.min = housingPriceMap[target.value];
  });

  price.addEventListener('input', function (evt) {
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

  price.addEventListener('invalid', function () {
    var min = price.getAttribute('min');

    switch (true) {
      case price.validity.rangeOverflow:
        price.setCustomValidity('Максимальная цена за ночь 1 000 000 рублей');
        break;
      case price.validity.rangeUnderflow:
        price.setCustomValidity('Минимальная цена за ночь ' + min + ' рублей');
        break;
      default:
        price.setCustomValidity('Обязательное поле');
        break;
    }
  });

  function onChangeRooms(evt) {
    window.util.getValidElement(evt, rooms, guests, roomsForGuestsMap);
  }

  function onChangeTimeIn(evt) {
    window.util.getValidElement(evt, timeIn, timeOut, timeKeyMap);
  }

  rooms.addEventListener('change', onChangeRooms);
  timeIn.addEventListener('change', onChangeTimeIn);

  adForm.addEventListener('submit', function (evt) {
    window.server.save(new FormData(adForm), onSubmitForm, onError);
    evt.preventDefault();
  });

  resetButton.addEventListener('click', onClickResetForm);

  window.form = {
    adProfile: adForm,
    adProfileFieldset: adFormFieldset,
    main: main,
    onError: onError
  };
})();
