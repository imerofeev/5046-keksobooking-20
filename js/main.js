'use strict';

var COUNTCARDS = 8;
var TYPEHOUSE = ['palace', 'flat', 'house', 'bungalo'];
var TYPEHOUSE_LABELS = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var ROOMS_FOR_GUESTS = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0']
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
var firstCard = [];

var ENTER_KEY = 'Enter';


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

function createCard(card) {
  var cardElement = cardTemplate.cloneNode(true);
  var imageContainer = cardElement.querySelector('.popup__photos');
  var featureContainer = cardElement.querySelector('.popup__features');

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = card.offer.type; cardElement.querySelector('.popup__type').textContent = TYPEHOUSE_LABELS[card.offer.type];
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + 'комнаты для' + card.offer.guests + ' гостей'; cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__avatar').src = card.author.avatar;

  renderImage(imageContainer, card.offer.photos);
  renderFeature(featureContainer, card.offer.features);

  return cardElement;
}

function renderCards(cards) {
  var fragment = document.createDocumentFragment();

  if (cards.length !== 0) {
    fragment.appendChild(createCard(cards[i])); for (var i = 0; i < cards.length; i++) {
    } fragment.appendChild(createCard(cards[i]));

    map.insertBefore(fragment, mapFilters); map.insertBefore(fragment, mapFilters);
  }
}

function createPin(card) {
  var pinElement = pinTemplate.cloneNode(true);

  pinElement.querySelector('.map__pin').style.left = card.location.x + 'px';
  pinElement.querySelector('.map__pin').style.top = card.location.y + 'px';

  pinElement.querySelector('.map__pin img').src = card.author.avatar;
  pinElement.querySelector('.map__pin img').alt = card.offer.title;

  return pinElement;
}

function renderPins(cards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createPin(cards[i]));
  }

  pinTemplateElement.appendChild(fragment);
}

function addAttribute(tagList, attributeName) {
  var firstCard = [cardsData[0]]; if (tagList) {
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

function logButton(evt) {
  if (evt.button === 0 || evt.key === ENTER_KEY) {
    map.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    mapFiltersForm.classList.remove('mapFiltersForm--disabled');
    deleteAttribute(adFormFieldset, DISABLED);
    renderPins(cardsData);
    getAddress(X_MAIN_PIN, Y_MAIN_PIN);
  }
}

function validRoomsForGuests(evt) {
  var el = (typeof evt === 'undefined') ? rooms : evt.currentTarget;
  var validRooms = ROOMS_FOR_GUESTS[el.value];

  var options = guests.querySelectorAll('option');

  if (options) {
    for (var i = 0; i < options.length; i++) {
      var optionEl = options[i];

      optionEl.disabled = (validRooms.indexOf(optionEl.value) === -1) ? true : false;
    }

    guests.querySelector('option[value="' + validRooms[0] + '"]').selected = true;
  }
}

var cardsData = getCards(COUNTCARDS);

renderCards(firstCard);
getAddress(MAIN_PIN_CIRCLE, MAIN_PIN_HALF_CIRCLE);
addAttribute(adFormFieldset, DISABLED);
mapPinMain.addEventListener('mousedown', logButton);
mapPinMain.addEventListener('keydown', logButton);
validRoomsForGuests();
rooms.addEventListener('change', validRoomsForGuests);
