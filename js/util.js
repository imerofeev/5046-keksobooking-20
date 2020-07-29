'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEBOUNCE_INTERVAL = 500;

  function getValidElement(evt, selectFirst, selectSecond, objectKeys) {
    var element = (typeof evt === 'undefined') ? selectFirst : evt.currentTarget;
    var validElement = objectKeys[element.value];
    var selectSecondOptions = selectSecond.querySelectorAll('option');

    if (selectSecondOptions) {
      selectSecondOptions.forEach(function (item) {
        item.disabled = (validElement.indexOf(item.value) === -1) ? true : false;
      });

      deleteAttribute(selectSecondOptions, 'selected');
      selectSecond.querySelector('option[value="' + validElement[0] + '"]').setAttribute('selected', '');

      selectSecond.addEventListener('change', function (e) {
        var valid = e.target.value;

        deleteAttribute(selectSecondOptions, 'selected');
        selectSecond.querySelector('option[value="' + valid + '"]').setAttribute('selected', '');
      });
    }
  }

  function addAttribute(tagList, attributeName) {
    tagList.forEach(function (item) {
      item.setAttribute(attributeName, 'true');
    });
  }

  function deleteAttribute(tagList, attributeName) {
    tagList.forEach(function (item) {
      item.removeAttribute(attributeName);
    });
  }

  function onPopupEscPress(evt, action) {
    if (evt.key === ESC_KEY) {
      action();
    }
  }

  function closePopup(element) {
    if (element) {
      element.remove();
    }

    document.removeEventListener('keydown', onPopupEscPress);
  }

  function debounce(cb) {
    var lastTimeout = null;

    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = {
    ENTER_KEY: ENTER_KEY,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup,
    debounce: debounce,
    getValidElement: getValidElement,
    addAttribute: addAttribute,
    deleteAttribute: deleteAttribute
  };
})();
