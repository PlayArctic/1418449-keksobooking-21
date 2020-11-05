'use strict';

const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`], //  js по умолчанию получает из html string
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`] // вынесено за скобки чтобы каждый раз не собирался объект внутри функции
};
const EARLY_CHECKTIME = `12:00`;
const MIDDLE_CHECKTIME = `13:00`;
const LATE_CHECKTIME = `14:00`;
const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;

let adFormElement = document.querySelector(`#adForm`);

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
      setCheckInDependencies(inputTarget);
      break;
    case `timeout`:
      setCheckOutDependencies(inputTarget);
      break;
    case `room_number`:
      setGuestDependencies();
      break;
  }
});

let setTitleValidation = function (inputTarget) {
  inputTarget.addEventListener(`input`, function () {
    const MIN_NAME_LENGTH = 30;
    const MAX_NAME_LENGTH = 100;

    let valueLength = inputTarget.value.length;

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

  switch (typeElement.value) {
    case `bungalow`:
      window.handlers.typeDependenciesHandler(priceElement, MIN_PRICE_BUNGALOW);
      break;
    case `flat`:
      window.handlers.typeDependenciesHandler(priceElement, MIN_PRICE_FLAT);
      break;
    case `house`:
      window.handlers.typeDependenciesHandler(priceElement, MIN_PRICE_HOUSE);
      break;
    case `palace`:
      window.handlers.typeDependenciesHandler(priceElement, MIN_PRICE_PALACE);
      break;
  }
};

let setCheckInDependencies = function (inputTarget) {
  let checkOut = document.querySelector(`#timeout`);

  switch (inputTarget.value) {
    case EARLY_CHECKTIME:
      checkOut.value = EARLY_CHECKTIME;
      break;
    case MIDDLE_CHECKTIME:
      checkOut.value = MIDDLE_CHECKTIME;
      break;
    case LATE_CHECKTIME:
      checkOut.value = LATE_CHECKTIME;
      break;
  }
};

let setCheckOutDependencies = function (inputTarget) {
  let checkIn = document.querySelector(`#timein`);

  switch (inputTarget.value) {
    case EARLY_CHECKTIME:
      checkIn.value = EARLY_CHECKTIME;
      break;
    case MIDDLE_CHECKTIME:
      checkIn.value = MIDDLE_CHECKTIME;
      break;
    case LATE_CHECKTIME:
      checkIn.value = LATE_CHECKTIME;
      break;
  }
};

let setGuestDependencies = function () {
  Array.from(document.querySelector(`#capacity`).options).forEach(function (option) {
    if (ROOMS_TO_GUESTS_MAP[document.querySelector(`#room_number`).value].includes(option.value)) {
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
