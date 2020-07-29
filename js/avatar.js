'use strict';

(function () {
  var FILE_TYPES = ['jpg', 'jpeg', 'png'];
  var HOUSING_PREWIEW_WIDTH = 70;
  var HOUSING_PREWIEW_HEIGHT = 70;

  var avatarChooser = document.querySelector('.ad-form__field input[type=file]');
  var previewAvatar = document.querySelector('.ad-form-header__preview img');
  var photoHousingChooser = document.querySelector('.ad-form__upload input[type=file]');
  var previewHousinChooser = document.querySelector('.ad-form__photo');
  var image = document.createElement('img');
  var imageHousing = previewHousinChooser.appendChild(image);

  imageHousing.setAttribute('src', ' ');
  imageHousing.setAttribute('width', HOUSING_PREWIEW_WIDTH);
  imageHousing.setAttribute('height', HOUSING_PREWIEW_HEIGHT);

  function loadImageFile(evt, object) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        object.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  }

  function onChangeAvatar(evt) {
    loadImageFile(evt, previewAvatar);
  }

  function onChangeImageHousing(evt) {
    loadImageFile(evt, imageHousing);
  }

  avatarChooser.addEventListener('change', onChangeAvatar);
  photoHousingChooser.addEventListener('change', onChangeImageHousing);

  window.avatar = {
    preview: previewAvatar,
    imageHousing: imageHousing
  };
})();
