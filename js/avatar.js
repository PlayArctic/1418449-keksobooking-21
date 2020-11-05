'use strict';

let FILE_TYPES = [`jpg`, `jpeg`, `png`, `gif`];

let AVATAR_TARGETS = {
  avatar: {
    input: document.querySelector(`.ad-form-header__input`),
    output: document.querySelector(`.ad-form-header__preview img`)
  },
  photo: {
    input: document.querySelector(`.ad-form__input`),
    output: document.querySelector(`.ad-form__photo`)
  }
};


// AVATAR_TARGETS.avatar.input.addEventListener(`click`, () => console.log(`Succsess`)); // !работает

let setAvatar = function (pictureTargets) {
  for (let elem in pictureTargets) {
    if (pictureTargets.hasOwnProperty(elem)) {
      (pictureTargets.elem.input).addEventListener(`change`, function () {
        let file = (pictureTargets.elem.input).files[0];
        let fileName = file.name.toLowerCase();

        let matches = FILE_TYPES.some(function (ending) {
          return fileName.endsWith(ending);
        });

        if (matches) {
          let reader = new FileReader();

          reader.readAsDataURL(file);

          reader.addEventListener(`load`, function () {
            if ((pictureTargets.elem.output).tagName.toLowerCase() === `img`) {
              elem.output.src = reader.result;
            } else {
              let newElement = document.createElement(`img`);
              newElement.src = reader.result;

              newElement.setAttribute(`style`, `border-radius: 5px; width: 100%; height: 100%;`);

              (pictureTargets.elem.output).appendChild(newElement);
            }
          });
        }
      });
    }
  }
};

setAvatar(AVATAR_TARGETS);
