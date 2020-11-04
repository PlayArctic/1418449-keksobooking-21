'use strict';

const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};

let adFormElement = document.querySelector(`#adForm`);

adFormElement.addEventListener(`input`, function (evt) {
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

    inputTarget.reportValidity();
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
      priceElement.setAttribute(`min`, `0`);
      priceElement.setAttribute(`placeholder`, `0`);
      break;
    case `flat`:
      priceElement.setAttribute(`min`, `1000`);
      priceElement.setAttribute(`placeholder`, `1000`);
      break;
    case `house`:
      priceElement.setAttribute(`min`, `5000`);
      priceElement.setAttribute(`placeholder`, `5000`);
      break;
    case `palace`:
      priceElement.setAttribute(`min`, `10000`);
      priceElement.setAttribute(`placeholder`, `10000`);
      break;
  }
};

let setTimeInDependencies = function (inputTarget) {
  let timeOut = document.querySelector(`#timeout`);

  switch (inputTarget.value) {
    case `12:00`:
      timeOut.value = `12:00`;
      break;
    case `13:00`:
      timeOut.value = `13:00`;
      break;
    case `14:00`:
      timeOut.value = `14:00`;
      break;
  }
};

let setTimeOutDependencies = function (inputTarget) {
  let timeIn = document.querySelector(`#timein`);

  switch (inputTarget.value) {
    case `12:00`:
      timeIn.value = `12:00`;
      break;
    case `13:00`:
      timeIn.value = `13:00`;
      break;
    case `14:00`:
      timeIn.value = `14:00`;
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
