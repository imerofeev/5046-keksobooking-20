'use strict';

var COUNTCARDS = 8;
var TYPEHOUSE = ['palace', 'flat', 'house', 'bungalo'];
var TYPEHOUSE_LABELS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
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
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TITLE = ['title-1', 'title-2', 'title-3', 'title-4', 'title-5', 'title-6', 'title-7', 'title-8'];
var DESCRIPTION = ['description-1', 'description-2', 'description-3', 'description-4', 'description-5', 'description-6', 'description-7', 'description-8'];
var MAIN_PIN_CIRCLE = 62;
var MAIN_PIN_HALF_CIRCLE = 31;
var X_MAIN_PIN = 84;
var Y_MAIN_PIN = 72;
var X_OTHER_PIN = 50;
var Y_OTHER_PIN = 70;
var DISABLED = 'disabled';
var MIN_TITLE_LENGTH = 30;
var MAX_TITLE_LENGTH = 100;

var ENTER_KEY = 'Enter';
var ESC_KEY = 'Escape';

var map = document.querySelector('.map');

var mapFilters = map.querySelector('.map__filters-container');
var adForm = document.querySelector('.ad-form');
var adFormFieldset = adForm.querySelectorAll('fieldset');
var mapFiltersForm = mapFilters.querySelector('.map__filters');

var cardTemplate = document.querySelector('#card').content;

var pinTemplate = document.querySelector('#pin').content;

var pinTemplateElement = document.querySelector('.map__pins');
var mapPinMain = map.querySelector('.map__pin--main');

var rooms = adForm.querySelector('#room_number');
var guests = adForm.querySelector('#capacity');

var titleInput = adForm.querySelector('#title');
var priceInput = adForm.querySelector('#price');
var typeHouse = adForm.querySelector('#type');
var ckeckin = adForm.querySelector('#timein');
var ckeckout = adForm.querySelector('#timeout');

function getRandElement(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

function getRandElementArr(arr) {
  var randItem;

  for (var i = 0; i < arr.length; i++) {
    randItem = Math.floor(Math.random() * arr.length);
  }
  return arr[randItem];
}

function getRandLengthArr(arr) {
  var newArr = [];
  var newLength = getRandElement(1, arr.length);

  for (var k = 0; k < newLength; k++) {
    newArr[k] = getRandElementArr(arr);
  }
  return newArr;
}

function getCards(numberOfCards) {
  var cards = [];

  for (var i = 0; i < numberOfCards; i++) {
    cards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandElementArr(TITLE),
        address: getAddress(X_OTHER_PIN, Y_OTHER_PIN),
        price: getRandElement(1000, 100000),
        type: getRandElementArr(TYPEHOUSE),
        rooms: getRandElement(1, 3),
        guests: getRandElement(1, 3),
        checkin: getRandElementArr(TIME),
        checkout: getRandElementArr(TIME),
        features: getRandLengthArr(FEATURES),
        description: getRandElementArr(DESCRIPTION),
        photos: getRandLengthArr(PHOTOS)
      },
      location: {
        x: getRandElement(0, 1100) + (X_OTHER_PIN / 2),
        y: getRandElement(130, 560) + Y_OTHER_PIN
      }
    };
  }

  return cards;
}

function renderImage(container, photos) {
  container.innerHTML = '';

  for (var i = 0; i < photos.length; i++) {
    var img = document.createElement('img');

    img.src = photos[i];
    img.className = 'popup__photo';
    img.width = 45;
    img.height = 40;
    img.alt = 'Фотография жилья';

    container.appendChild(img);
  }
}

function renderFeature(container, features) {
  container.innerHTML = '';

  for (var i = 0; i < features.length; i++) {
    var li = document.createElement('li');

    li.textContent = features[i];
    li.className = 'popup__feature popup__feature--' + li.textContent;

    container.appendChild(li);
  }
}

function onPopupEscPress(evt) {
  if (evt.key === ESC_KEY) {
    closePopup();
  }
}

function closePopup() {
  var popup = map.querySelector('.popup');

  if (popup) {
    popup.remove();
  }

  document.removeEventListener('keydown', onPopupEscPress);
}

function createCard(card) {
  var cardElement = cardTemplate.cloneNode(true);

  var imageContainer = cardElement.querySelector('.popup__photos');
  var featureContainer = cardElement.querySelector('.popup__features');

  var closeButton = cardElement.querySelector('.popup__close');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type; cardElement.querySelector('.popup__type').textContent = TYPEHOUSE_LABELS[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + 'комнаты для' + card.offer.guests + ' гостей'; cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  document.addEventListener('keydown', function (evt) {
    onPopupEscPress(evt);
  });

  closeButton.addEventListener('click', function () {
    closePopup();
  });

  renderImage(imageContainer, card.offer.photos);
  renderFeature(featureContainer, card.offer.features);

  return cardElement;
}

function renderCard(container, card) {
  closePopup();

  container.appendChild(card);
}

function createPin(card) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = card.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = card.location.y + 'px';

  pinElement.querySelector('.map__pin img').src = card.author.avatar;
  pinElement.querySelector('.map__pin img').alt = card.offer.title;

  pinElement.querySelector('.map__pin').addEventListener('click', function () {
    var container = document.querySelector('.map');
    renderCard(container, createCard(card));
  });

  return pinElement;
}

function renderPins(cards) {
  for (var i = 0; i < cards.length; i++) {
    pinTemplateElement.appendChild(createPin(cards[i]));
  }
}

function addAttribute(tagList, attributeName) {
  firstCard = [cardsData[0]]; if (tagList) {
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

function getAddress(xPin, yPin) {
  var inputAddress = adForm.querySelector('#address');
  var left = mapPinMain.style.left;
  var top = mapPinMain.style.top;
  var xLocation = Math.floor(Number(left.replace('px', '')) + (xPin / 2));
  var yLocation = Math.floor(Number(top.replace('px', '')) + yPin);

  xLocation = (xLocation <= 0) ? 0 : xLocation;
  xLocation = (xLocation >= 1200) ? 1200 : xLocation;
  yLocation = (yLocation <= 130) ? 130 : yLocation;
  yLocation = (yLocation >= 630) ? 630 : yLocation;


  inputAddress.value = (xLocation + ', ' + yLocation);

  return xLocation + ', ' + yLocation;
}

function activePage(evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    var mapPin = map.querySelectorAll('.map__pin:not(.map__pin--main)');
    adForm.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('mapFiltersForm--disabled'); if (mapPin.length === 0) {
      deleteAttribute(adFormFieldset, DISABLED); map.classList.remove('map--faded');
      renderPins(cardsData); adForm.classList.remove('ad-form--disabled');
      getAddress(X_MAIN_PIN, Y_MAIN_PIN); mapFiltersForm.classList.remove('mapFiltersForm--disabled');
      deleteAttribute(adFormFieldset, DISABLED);
      renderPins(cardsData);
      getAddress(X_MAIN_PIN, Y_MAIN_PIN);
    }
  }
}

function getValidElement(evt, selectFirst, selectSecond, objectKeys) {
  var el = (typeof evt === 'undefined') ? rooms : evt.currentTarget; el = (typeof evt === 'undefined') ? selectFirst : evt.currentTarget;
  var validRooms = RoomsForGuests[el.value]; var validElem = objectKeys[el.value];

  var selectSecondOption = selectSecond.querySelectorAll('option');
  var options = guests.querySelectorAll('option');


  if (options) {
    if (selectSecondOption) {
      for (var i = 0; i < options.length; i++) {
        for (i = 0; i < selectSecondOption.length; i++) {
          var optionElem = options[i]; optionElem = selectSecondOption[i];


          optionElem.disabled = (validRooms.indexOf(optionElem.value) === -1) ? true : false; optionElem.disabled = (validElem.indexOf(optionElem.value) === -1) ? true : false;
        }
      }

      selectSecond.querySelector('option[value="' + validElem[0] + '"]').selected = true;
      guests.querySelector('option[value="' + validRooms[0] + '"]').selected = true;
    }
  }
}


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
      priceInput.setCustomValidity('');
      break;
  }
});

var cardsData = getCards(COUNTCARDS);

getAddress(MAIN_PIN_CIRCLE, MAIN_PIN_HALF_CIRCLE);
addAttribute(adFormFieldset, DISABLED);

getValidElement(undefined, rooms, guests, RoomsForGuests);

mapPinMain.addEventListener('mousedown', activePage);
rooms.addEventListener('change', validRoomsForGuests); mapPinMain.addEventListener('keydown', activePage);
rooms.addEventListener('change', function (evt) {
  getValidElement(evt, rooms, guests, RoomsForGuests);
});
ckeckin.addEventListener('change', function (evt) {
  getValidElement(evt, ckeckin, ckeckout, TimeKey);
});
