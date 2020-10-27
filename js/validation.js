'use strict';

let adFormElement = document.querySelector(`#adForm`);
const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`], //  js по умолчанию получает из html string
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`] // вынесено за скобки чтобы каждый раз не собирался объект внутри функции
};

adFormElement.addEventListener(`input`, function (evt) { // общий обработчик на form (делегирование событий)
  let inputId = evt.target.id;
  let inputTarget = evt.target;

  switch (inputId) {
    case `title`:
      setTitleValidation(inputTarget);
      break;
    case `price`:
      setPriceValidation(inputTarget);
      break;
    case `type`:
      setTypeDependencies();
      break;
    case `timein`:
      setTimeInDependencies(inputTarget);
      break;
    case `timeout`:
      setTimeOutDependencies(inputTarget);
      break;
    case `room_number`:
      setGuestDependencies();
      break;
  }
});

let setTitleValidation = function (inputTarget) {
  inputTarget.addEventListener(`input`, function () {
    let valueLength = inputTarget.value.length;
    const MIN_NAME_LENGTH = 30; // так как значения не будут меняться, можно убрать const
    const MAX_NAME_LENGTH = 100;

    if (valueLength < MIN_NAME_LENGTH) {
      inputTarget.setCustomValidity(`Еще ` + (MIN_NAME_LENGTH - valueLength) + ` символов.`);
    } else if (valueLength > MAX_NAME_LENGTH) {
      inputTarget.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` символов.`);
    } else {
      inputTarget.setCustomValidity(``);
    }

    inputTarget.reportValidity(); // нужен reportValidity тк после setCustomValidity браузер далее валидность не проверяет
  });
};

let setPriceValidation = function (inputTarget) {
  const MAX_PRICE = 1000000;

  inputTarget.setAttribute(`required`, `required`);

  if (inputTarget.value > MAX_PRICE) {
    inputTarget.setCustomValidity(`Цена не должна превышать ${MAX_PRICE}`);
  } else {
    inputTarget.setCustomValidity(``);
  }

  inputTarget.reportValidity();
};

let setTypeDependencies = function () {
  let priceElement = document.querySelector(`#price`);
  let typeElement = document.querySelector(`#type`);

  if (typeElement.value === `bungalow`) {
    priceElement.setAttribute(`min`, `0`);
    priceElement.setAttribute(`placeholder`, `0`);
  } else if (typeElement.value === `flat`) {
    priceElement.setAttribute(`min`, `1000`);
    priceElement.setAttribute(`placeholder`, `1000`);
  } else if (typeElement.value === `house`) {
    priceElement.setAttribute(`min`, `5000`);
    priceElement.setAttribute(`placeholder`, `5000`);
  } else if (typeElement.value === `palace`) {
    priceElement.setAttribute(`min`, `10000`);
    priceElement.setAttribute(`placeholder`, `10000`);
  }
};

let setTimeInDependencies = function (inputTarget) {
  let timeOut = document.querySelector(`#timeout`);
  if (inputTarget.value === `12:00`) {
    timeOut.value = `12:00`;
  } else if (inputTarget.value === `13:00`) {
    timeOut.value = `13:00`;
  } else if (inputTarget.value === `14:00`) {
    timeOut.value = `14:00`;
  }
};

let setTimeOutDependencies = function (inputTarget) {
  let timeIn = document.querySelector(`#timein`);
  if (inputTarget.value === `12:00`) {
    timeIn.value = `12:00`;
  } else if (inputTarget.value === `13:00`) {
    timeIn.value = `13:00`;
  } else if (inputTarget.value === `14:00`) {
    timeIn.value = `14:00`;
  }
};

let setGuestDependencies = function () {
  let roomsCount = document.querySelector(`#room_number`).value;

  Array.from(document.querySelector(`#capacity`).options).forEach(function (option) {
    if (ROOMS_TO_GUESTS_MAP[roomsCount].includes(option.value)) {
      option.removeAttribute(`disabled`);
      option.setAttribute(`selected`, ``);
    } else {
      option.setAttribute(`disabled`, ``);
      option.removeAttribute(`selected`);
    }
  });
};

let setAllowedFiles = function () {
  document.querySelector(`#avatar`).setAttribute(`accept`, `image/png, image/jpeg`);
  document.querySelector(`#images`).setAttribute(`accept`, `image/png, image/jpeg`);
};

window.validation = {
  setTypeDependencies,
  setGuestDependencies,
  setAllowedFiles
};

window.validation.setTypeDependencies();
window.validation.setGuestDependencies();
window.validation.setAllowedFiles();
