'use strict';

(function () {
  var TYPEHOUSE_LABELS = {
    palace: 'Дворец',
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало'
  };
  var cardTemplate = document.querySelector('#card')
    .content;

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
    var closeButton = cardElement.querySelector('.popup__close');

    cardElement.querySelector('.popup__title').textContent = card.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = card.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardElement.querySelector('.popup__type').textContent = TYPEHOUSE_LABELS[card.offer.type];
    cardElement.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardElement.querySelector('.popup__description').textContent = card.offer.description;
    cardElement.querySelector('.popup__avatar').src = card.author.avatar;

    document.addEventListener('keydown', function (evt) {
      var popup = window.map.map.querySelector('.popup');
      window.util.onPopupEscPress(evt, function () {
        window.util.closePopup(popup);
      });
    });

    closeButton.addEventListener('click', function () {
      var popup = window.map.map.querySelector('.popup');

      window.util.closePopup(popup);
    });

    renderImage(imageContainer, card.offer.photos);
    renderFeature(featureContainer, card.offer.features);

    return cardElement;
  }

  function renderCard(container, card) {
    var popup = window.map.map.querySelector('.popup');
    window.util.closePopup(popup);

    container.appendChild(card);
  }

  window.card = {
    createCard: createCard,
    renderCard: renderCard
  };
})();
