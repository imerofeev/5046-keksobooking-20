'use strict';

(function () {
  var pinTemplate = document.querySelector('#pin').content;
  var pinsContainer = document.querySelector('.map__pins');

  function createPin(card) {
    var pin = pinTemplate.cloneNode(true);

    pin.querySelector('.map__pin').style.left = card.location.x + 'px';
    pin.querySelector('.map__pin').style.top = card.location.y + 'px';
    pin.querySelector('.map__pin img').src = card.author.avatar;
    pin.querySelector('.map__pin img').alt = card.offer.title;

    pin.querySelector('.map__pin').addEventListener('click', function (evt) {
      var container = document.querySelector('.map');
      var activeElement = evt.currentTarget;
      var activePin = window.map.container.querySelector('.map__pin--active');

      if (activePin) {
        activePin.classList.remove('map__pin--active');
      }

      activeElement.classList.add('map__pin--active');
      window.card.render(container, window.card.create(card));
    });

    return pin;
  }

  function renderPins(cards) {
    var takeNumber = cards.length > 5 ? 5 : cards.length;

    for (var i = 0; i < takeNumber; i++) {
      pinsContainer.appendChild(createPin(cards[i]));
    }
  }

  function clearPins() {
    var pins = window.map.container.querySelectorAll('.map__pin:not(.map__pin--main)');

    pins.forEach(function (item) {
      pinsContainer.removeChild(item);
    });
  }

  window.pin = {
    render: renderPins,
    clear: clearPins
  };
})();
