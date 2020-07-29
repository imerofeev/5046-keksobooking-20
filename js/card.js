'use strict';

(function () {
  var typeHousingArr = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card').content;

  function renderImage(container, photos) {
    container.innerHTML = '';
    photos.forEach(function (item) {
      var img = document.createElement('img');

      img.src = item;
      img.className = 'popup__photo';
      img.width = 45;
      img.height = 40;
      img.alt = 'Фотография жилья';
      container.appendChild(img);
    });
  }

  function renderFeature(container, features) {
    container.innerHTML = '';
    features.forEach(function (item) {
      var li = document.createElement('li');

      li.textContent = item;
      li.className = 'popup__feature popup__feature--' + item;
      container.appendChild(li);
    });
  }

  function closeCard() {
    var popup = document.querySelector('.popup');
    var activePin = window.map.container.querySelector('.map__pin--active');

    window.util.closePopup(popup);

    if (activePin) {
      activePin.classList.remove('map__pin--active');
    }
  }

  function onKeyDownClosePopup() {
    closeCard();
  }

  function onMouseDownClosePopup() {
    closeCard();
  }

  function createCard(card) {
    var cardPopup = cardTemplate.cloneNode(true);
    var imageContainer = cardPopup.querySelector('.popup__photos');
    var featureContainer = cardPopup.querySelector('.popup__features');
    var closeButton = cardPopup.querySelector('.popup__close');

    cardPopup.querySelector('.popup__title').textContent = card.offer.title;
    cardPopup.querySelector('.popup__text--address').textContent = card.offer.address;
    cardPopup.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardPopup.querySelector('.popup__type').textContent = typeHousingArr[card.offer.type];
    cardPopup.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardPopup.querySelector('.popup__description').textContent = card.offer.description;
    cardPopup.querySelector('.popup__avatar').src = card.author.avatar;

    renderImage(imageContainer, card.offer.photos);
    renderFeature(featureContainer, card.offer.features);

    document.addEventListener('keydown', function (evt) {
      window.util.onPopupEscPress(evt, onKeyDownClosePopup);
    });

    closeButton.addEventListener('click', onMouseDownClosePopup);

    return cardPopup;
  }

  function renderCard(container, card) {
    var popup = document.querySelector('.popup');

    window.util.closePopup(popup);
    container.appendChild(card);
  }

  window.card = {
    create: createCard,
    render: renderCard,
    close: closeCard
  };
})();
