'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';
  var DEBOUNCE_INTERVAL = 500;


  function getValidElement(evt, selectFirst, selectSecond, objectKeys) {
    var element = (typeof evt === 'undefined') ? selectFirst : evt.currentTarget;
    var validElement = objectKeys[element.value];
    var selectSecondOption = selectSecond.querySelectorAll('option');

    if (selectSecondOption) {
      for (var i = 0; i < selectSecondOption.length; i++) {
        var optionElements = selectSecondOption[i];

        optionElements.disabled = (validElement.indexOf(optionElements.value) === -1) ? true : false;
      }
      selectSecond.querySelector('option[value="' + validElement[0] + '"]').selected = true;
    }
  }

  function addAttribute(tagList, attributeName) {
    if (tagList) {
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
