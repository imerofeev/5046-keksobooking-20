'use strict';

(function () {
  var ESC_KEY = 'Escape';
  var ENTER_KEY = 'Enter';

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

  window.util = {
    ENTER_KEY: ENTER_KEY,
    onPopupEscPress: onPopupEscPress,
    closePopup: closePopup,
    getRandElement: getRandElement,
    getRandElementArr: getRandElementArr,
    getRandLengthArr: getRandLengthArr
  };
})();
