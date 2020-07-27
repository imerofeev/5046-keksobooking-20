'use strict';

var COUNTCARDS = 8;
var TYPEHOUSE = ['palace', 'flat', 'house', 'bungalo'];
var TIME = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var TITLE = ['title-1', 'title-2', 'title-3', 'title-4', 'title-5', 'title-6', 'title-7', 'title-8'];
var DESCRIPTION = ['description-1', 'description-2', 'description-3', 'description-4', 'description-5', 'description-6', 'description-7', 'description-8'];


var map = document.querySelector('.map');
map.classList.remove('map--faded');

var cardTemplate = document.querySelector('#card')
  .content;
var cardTemplateElement = cardTemplate.querySelector('.popup');

var pinTemplate = document.querySelector('#pin')
  .content;
var pinTemplateElement = document.querySelector('.map__pins');


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

function getCard(numberOfCards) {
  var cards = [];

  for (var i = 0; i < numberOfCards; i++) {
    cards[i] = {
      author: {
        avatar: 'img/avatars/user0' + (i + 1) + '.png'
      },
      offer: {
        title: getRandElementArr(TITLE),
        address: (getRandElement(0, 1100) + 25) + ', ' + (getRandElement(130, 560) + 70),
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
        x: getRandElement(0, 1100) + 25,
        y: getRandElement(130, 560) + 70
      }
    };
  }

  return cards;
}

function createCard(card) {
  var cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector('.popup__title').textContent = card.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = card.offer.price;
  cardElement.querySelector('.popup__type').textContent = card.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + 'комнаты для' + card.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = card.offer.features;
  cardElement.querySelector('.popup__description').textContent = card.offer.description;
  cardElement.querySelector('.popup__photos').textContent = card.offer.photos;

  return cardElement;
}

function copyCard(cards) {
  var fragment = document.createDocumentFragment();

  for (var i = 0; i < cards.length; i++) {
    fragment.appendChild(createCard(cards[i]));
  }

  cardTemplateElement.appendChild(fragment);
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

var cardsData = getCard(COUNTCARDS);

copyCard(COUNTCARDS);
renderPins(cardsData);
