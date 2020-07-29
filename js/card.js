'use strict';

(function () {
  var typeHouseArr = {
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
    var cardPopup = cardTemplate.cloneNode(true);
    var imageContainer = cardPopup.querySelector('.popup__photos');
    var featureContainer = cardPopup.querySelector('.popup__features');
    var closeButton = cardPopup.querySelector('.popup__close');

    cardPopup.querySelector('.popup__title').textContent = card.offer.title;
    cardPopup.querySelector('.popup__text--address').textContent = card.offer.address;
    cardPopup.querySelector('.popup__text--price').textContent = card.offer.price + '₽/ночь';
    cardPopup.querySelector('.popup__type').textContent = typeHouseArr[card.offer.type];
    cardPopup.querySelector('.popup__text--capacity').textContent = card.offer.rooms + ' комнаты для ' + card.offer.guests + ' гостей';
    cardPopup.querySelector('.popup__text--time').textContent = 'Заезд после ' + card.offer.checkin + ', выезд до ' + card.offer.checkout;
    cardPopup.querySelector('.popup__description').textContent = card.offer.description;
    cardPopup.querySelector('.popup__avatar').src = card.author.avatar;

    document.addEventListener('keydown', function (evt) {
      var popup = document.querySelector('.popup');
      window.util.onPopupEscPress(evt, function () {
        var activePin = window.map.container.querySelector('.map__pin--active');

        window.util.closePopup(popup);

        if (activePin) {
          activePin.classList.remove('map__pin--active');
        }
      });
    });

    closeButton.addEventListener('click', function () {
      var popup = document.querySelector('.popup');
      var activePin = window.map.container.querySelector('.map__pin--active');

      window.util.closePopup(popup);

      activePin.classList.remove('map__pin--active');
    });

    renderImage(imageContainer, card.offer.photos);
    renderFeature(featureContainer, card.offer.features);

    return cardPopup;
  }

  function renderCard(container, card) {
    var popup = document.querySelector('.popup');
    window.util.closePopup(popup);

    container.appendChild(card);
  }

  window.card = {
    createCard: createCard,
    renderCard: renderCard
  };
})();
