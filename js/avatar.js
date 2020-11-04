'use strict';

let FILE_TYPES = [`jpg`, `jpeg`, `png`, `gif`];

let setAvatar = function (chooserInput, previewOutput) {
  chooserInput.addEventListener(`change`, function () {
    let file = chooserInput.files[0];
    let fileName = file.name.toLowerCase();

    let matches = FILE_TYPES.some(function (ending) {
      return fileName.endsWith(ending);
    });

    if (matches) {
      let reader = new FileReader();

      reader.readAsDataURL(file);

      reader.addEventListener(`load`, function () {
        if (previewOutput.tagName.toLowerCase() === `img`) {
          previewOutput.src = reader.result;
        } else {
          let newElement = document.createElement(`img`);
          newElement.src = reader.result;

          newElement.setAttribute(`style`, `border-radius: 5px; width: 100%; height: 100%;`);

          previewOutput.appendChild(newElement);
        }
      });
    }
  });
};

setAvatar(document.querySelector(`.ad-form-header__input`), document.querySelector(`.ad-form-header__preview img`));
setAvatar(document.querySelector(`.ad-form__input`), document.querySelector(`.ad-form__photo`));

