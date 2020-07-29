'use strict';

(function () {
  var housingType = window.map.filters.querySelector('#housing-type');
  var housingPrice = window.map.filters.querySelector('#housing-price');
  var housingRooms = window.map.filters.querySelector('#housing-rooms');
  var housingGuests = window.map.filters.querySelector('#housing-guests');
  var housingFeatures = window.map.filters.querySelectorAll('.map__checkbox');

  function updatePins(cards) {
    var sortedCards = cards.filter(function (card) {
      var shouldPresent = true;

      if (typeof card.offer === 'undefined' || card.offer === '') {
        shouldPresent = false;
      }
      return shouldPresent;
    });
    window.pin.renderPins(sortedCards);
  }

  function reloadPins() {
    var popup = document.querySelector('.popup');
    window.util.closePopup(popup);
    window.pin.clearPins();
    window.pin.renderPins(window.map.filteredOffers);
  }

  window.map.filters.addEventListener('change', window.util.debounce(function () {
    window.map.filteredOffers = applyFilters(window.map.dataPins);
    reloadPins();
  }));

  function applyFilters(data) {
    return data
      .filter(function (offer) {
        return (
          filterHousingType(offer) &&
          filterHousingPrice(offer) &&
          filterHousingRooms(offer) &&
          filterHousingGuests(offer) &&
          filterHousingFeatures(offer)
        );
      });
  };

  function filterHousingType(card) {
    var housing = window.map.mapFiltersForm.querySelector('#housing-type');
    return housingType.value === 'any' ? true : card.offer.type === housingType.value;
  }

  function filterHousingPrice(card) {
    var result;

    switch (housingPrice.value) {
      case 'low':
        result = card.offer.price < 10000;
        break;
      case 'middle':
        result = card.offer.price >= 10000 && card.offer.price <= 50000;
        break;
      case 'high':
        result = card.offer.price > 50000;
        break;
      case 'any':
      default:
        result = true;
        break;
    }

    return result;
  }

  function filterHousingRooms(card) {
    return housingRooms.value === 'any' ? true : card.offer.rooms === Number(housingRooms.value);
  }

  function filterHousingGuests(card) {
    return housingGuests.value === 'any' ? true : card.offer.guests === Number(housingGuests.value);
  }

  function filterHousingFeatures(card) {
    return Array.from(housingFeatures).filter(function (el) {
      return el.checked;
    }).every(function (feature) {
      return card.offer.features.includes(feature.value);
    });
  }

  window.filter = {
    updatePins: updatePins
  };
})();
