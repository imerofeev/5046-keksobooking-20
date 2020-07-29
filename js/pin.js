'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;

  var pinTemplateElement = document.querySelector('.map__pins');

  function createPin(card) {
    var pinElement = pinTemplate.cloneNode(true);

    pinElement.querySelector('.map__pin').style.left = card.location.x + 'px';
    pinElement.querySelector('.map__pin').style.top = card.location.y + 'px';
    pinElement.querySelector('.map__pin img').src = card.author.avatar;
    pinElement.querySelector('.map__pin img').alt = card.offer.title;

    pinElement.querySelector('.map__pin').addEventListener('click', function () {
      var container = document.querySelector('.map');
      window.card.renderCard(container, window.card.createCard(card));
    });

    return pinElement;
  }

  function renderPins(cards) {
    for (var i = 0; i < cards.length; i++) {
      pinTemplateElement.appendChild(createPin(cards[i]));
    }
  }

  window.pin = {
    renderPins: renderPins
  };
})();
