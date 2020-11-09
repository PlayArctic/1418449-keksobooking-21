/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!***********************!*\
  !*** ./js/service.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let nodeSuccess = document.querySelector(`#success`).content;
let nodeError = document.querySelector(`#error`).content;

let onSuccessSendCallback = function () {
  let newNode = nodeSuccess.cloneNode(true).querySelector(`.success`);

  newNode.classList.add(`overlay`);

  document.body.appendChild(newNode);

  let overlay = document.querySelector(`.overlay`);

  overlay.addEventListener(`click`, window.handlers.setOverlayHandler);
  document.addEventListener(`keydown`, window.handlers.overlayCloseHandlerEsc);
};


let onErrorSendCallback = function (error) {
  let newNode = nodeError.cloneNode(true);

  newNode.querySelector(`.error`).classList.add(`overlay`);
  newNode.querySelector(`.error__message`).textContent = error;

  document.body.appendChild(newNode);

  let overlay = document.querySelector(`.overlay`);
  let errorButton = document.querySelector(`.error__button`);

  overlay.addEventListener(`click`, window.handlers.setOverlayHandler);
  document.addEventListener(`keydown`, window.handlers.overlayCloseHandlerEsc);

  errorButton.addEventListener(`keydown`, function (evt) {
    if (evt.code === `Escape` || evt.which === 1) {
      errorButton.remove();
    }
  });

};

let onErrorReceiveCallback = function (errorMessage) {
  let node = document.createElement(`div`);

  node.style = `border-radius: 0 0 5px 5px; z-index: 100; margin: 0 auto; text-align: center; background-color: orange;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `24px`;
  node.style.fontFamily = `Roboto`;
  node.textContent = errorMessage;

  document.body.appendChild(node);
};

window.service = {
  onSuccessSendCallback,
  onErrorSendCallback,
  onErrorReceiveCallback,
};

})();

(() => {
/*!***********************!*\
  !*** ./js/request.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */
/* eslint-disable object-shorthand */


let URL_LOAD_ADDRESS = `https://21.javascript.pages.academy/keksobooking/data`;
let URL_UPLOAD_ADDRESS = `https://21.javascript.pages.academy/keksobooking`;

let data = [];

let getData = function () {
  return data;
};

let sendRequest = function (url, body, onSuccessCallback, onErrorCallback) { // data это то что передаем на сервер, см. ниже
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    const SUCCESS_CODE = 200;
    const WRONG_REQUEST_CODE = 400;
    const NOT_AUTHORIZED_CODE = 401;
    const NOT_FOUND_CODE = 404;
    let error;

    switch (xhr.status) {
      case SUCCESS_CODE:
        let response = xhr.response;

        if (Array.isArray(response)) {
          data = response.filter((item) => item.offer);
        }

        onSuccessCallback(data);
        break;
      case WRONG_REQUEST_CODE:
        error = `Неверный запрос`;
        break;
      case NOT_AUTHORIZED_CODE:
        error = `Пользователь не авторизован`;
        break;
      case NOT_FOUND_CODE:
        error = `Ничего не найдено`;
        break;
      default:
        error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
    }

    if (error) {
      onErrorCallback(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    onErrorCallback(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onErrorCallback(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = 10000;

  xhr.open(body ? `POST` : `GET`, url);
  xhr.send(body);
};

// let getErrorMessage = function (errorResponse) {
//   const WRONG_REQUEST_CODE = 400;
//   const NOT_AUTHORIZED_CODE = 401;
//   const NOT_FOUND_CODE = 404;

//   switch (errorResponse.status) {
//     case WRONG_REQUEST_CODE:
//       return `Неверный запрос`;
//     case NOT_AUTHORIZED_CODE:
//       return `Пользователь не авторизован`;
//     case NOT_FOUND_CODE:
//       return `Ничего не найдено`;
//     default:
//       return `Cтатус ответа: ` + errorResponse.status + ` ` + errorResponse.statusText;
//   }
// };

// let sendRequestFetch = function (url, body, onSuccessCallback, onErrorCallback) {
//   const params = {
//     method: body ? `POST` : `GET`,
//     headers: {
//       'Content-Type': `multipart/form-data`
//     },
//   };

//   if (body) {
//     params.body = body;
//   }

//   fetch(url, params)
//     .then((response) => {
//       if (response.ok) {
//         return response.json();
//       } else {
//         return new Promise((resolve, reject) => {
//           reject(response);
//         });
//       }
//     })
//     .then((responseData) => {
//       data = responseData.filter((item) => item.offer);

//       onSuccessCallback(data);
//     })
//     .catch((error) => {
//       onErrorCallback(getErrorMessage(error));
//     });
// };

window.request = {
  URL_LOAD_ADDRESS,
  URL_UPLOAD_ADDRESS,
  getData,
  sendRequest,
};

})();

(() => {
/*!************************!*\
  !*** ./js/handlers.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let mapPin = document.querySelector(`.map__pin--main`);
let mapFaded = document.querySelector(`.map--faded`);
let map = document.querySelector(`.map`);
let mapFilters = document.querySelectorAll(`.map__filter`);
let mapFeatures = document.querySelector(`.map__features`);
let adForm = document.querySelector(`.ad-form`);
let mapAdFormDisabled = document.querySelector(`.ad-form--disabled`);
let adFormAll = document.querySelectorAll(`.ad-form__element`);
let currentAddress = document.querySelector(`#address`);
let resetButton = document.querySelector(`.ad-form__reset`);
let form = document.querySelector(`#adForm`);
let submitButton = document.querySelector(`.ad-form__submit`);


let typeDependenciesHandler = function (priceInputElement, minPrice) {
  priceInputElement.setAttribute(`min`, minPrice);
  priceInputElement.setAttribute(`placeholder`, minPrice);
};

let setCardCloseHandler = function () {
  let popupCloseButton = document.querySelector(`.popup__close`);
  let popupCard = document.querySelector(`.map__card`);

  popupCloseButton.addEventListener(`click`, function () {
    popupCard.remove();
  });
};

/* Вешаем обработчики событий на document. для карточки объявления и overlay */

let mapPinHandler = function (evt) {
  if (evt.code === `Enter` || evt.which === 1) {
    window.card.renderCard(evt);
  }
};

let removeElementByEsc = function (evt, selector) {
  let elementToRemove = document.querySelector(selector);

  if (evt.code === `Escape` && elementToRemove) {
    elementToRemove.remove();
  }
};

let renderedCardCloseHandler = function (evt) {
  removeElementByEsc(evt, `.map__card`);
};

let overlayCloseHandlerEsc = function (evt) {
  removeElementByEsc(evt, `.overlay`);
};


let setRenderedCardHandlers = function () {
  document.querySelector(`.map__pins`).addEventListener(`click`, mapPinHandler);
  document.querySelector(`.map__pins`).addEventListener(`keydown`, mapPinHandler);
};


/* Вешаем обработчики событий на Notice скцию*/

let disableAdform = function () {
  for (let feature of adFormAll) {
    feature.setAttribute(`disabled`, `disabled`);
  }
  for (let feature of mapFilters) {
    feature.setAttribute(`disabled`, `disabled`);
  }

  mapFeatures .setAttribute(`disabled`, `disabled`);
};

let enableAdForm = function () {
  for (let feature of adFormAll) {
    feature.removeAttribute(`disabled`);
  }
  for (let feature of mapFilters) {
    feature.removeAttribute(`disabled`);
  }

  mapFeatures .removeAttribute(`disabled`);
};

let setCurrentAddress = function () {
  const MAIN_PIN_WIDTH = 32;
  const MAIN_PIN_HEIGHT = 62;

  currentAddress.value = (`${mapPin.style.left.replace(/px/, ``) - MAIN_PIN_WIDTH}, ${mapPin.style.top.replace(/px/, ``) - MAIN_PIN_HEIGHT}`);
  currentAddress.setAttribute(`readonly`, `readonly`);
};

let activateAllAdForm = function () {
  mapFaded.classList.remove(`map--faded`);
  mapAdFormDisabled.classList.remove(`ad-form--disabled`);

  document.querySelector(`#title`).setAttribute(`required`, `required`);

  window.request.sendRequest(window.request.URL_LOAD_ADDRESS, null, window.filter.updateData, window.service.onErrorReceiveCallback);
  enableAdForm();
};

let deactivateAllAdForm = function () {
  adForm.reset();
  adForm.classList.add(`ad-form--disabled`);

  map.classList.add(`map--faded`);

  mapPin.style.left = `570px`;
  mapPin.style.top = `375px`;

  document.querySelectorAll(`.map__pin[type=button]`).forEach(function (node) {
    node.remove();
  });

  document.querySelectorAll(`.ad-form__photo`).forEach(function (node) {
    node.remove();
  });

  document.querySelector(`.ad-form-header__preview img`).src = `img/muffin-grey.svg`;

  setCurrentAddress();

  disableAdform();
};

let setOverlayHandler = function (evt) {
  if (evt.which === 1 && document.querySelector(`.overlay`)) {
    document.querySelector(`.overlay`).remove();
  }
};

let mapFadedHandler = function (evt) {
  if ((evt.code === `Enter` || evt.which === 1) && document.querySelector(`.map--faded`)) {
    setCurrentAddress();
    activateAllAdForm();
  }
};

form.addEventListener(`submit`, function (evt) {
  evt.preventDefault();

  window.request.sendRequest(
      window.request.URL_UPLOAD_ADDRESS,
      new FormData(form),
      window.service.onSuccessSendCallback,
      window.service.onErrorSendCallback
  );

  window.handlers.deactivateAllAdForm();
});

submitButton.addEventListener(`click`, setOverlayHandler);
submitButton.addEventListener(`keydown`, setOverlayHandler);

mapPin.addEventListener(`click`, mapFadedHandler);
mapPin.addEventListener(`keydown`, mapFadedHandler);

resetButton.addEventListener(`click`, deactivateAllAdForm);

setCurrentAddress();
setRenderedCardHandlers();
disableAdform();

window.handlers = {
  typeDependenciesHandler,
  setCardCloseHandler,
  setCurrentAddress,
  deactivateAllAdForm,
  setOverlayHandler,
  mapFadedHandler,
  renderedCardCloseHandler,
  overlayCloseHandlerEsc
};


})();

(() => {
/*!**********************!*\
  !*** ./js/avatar.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let FILE_TYPES = [`jpg`, `jpeg`, `png`, `gif`];

let AVATAR_TARGETS = [
  {
    input: document.querySelector(`.ad-form-header__input`),
    output: document.querySelector(`.ad-form-header__preview img`)
  },
  {
    input: document.querySelector(`.ad-form__input`),
    output: document.querySelector(`.ad-form__photo`)
  }
];

let setAvatar = function (pictureTargets) {
  for (let elem of pictureTargets) {
    elem.input.addEventListener(`change`, function () {
      let file = elem.input.files[0];
      let fileName = file.name.toLowerCase();

      let matches = FILE_TYPES.some(function (ending) {
        return fileName.endsWith(ending);
      });

      if (matches) {
        let reader = new FileReader();

        reader.readAsDataURL(file);

        reader.addEventListener(`load`, function () {
          if (elem.output.tagName.toLowerCase() === `img`) {
            elem.output.src = reader.result;
          } else {
            let newElement = document.createElement(`img`);
            newElement.src = reader.result;

            newElement.setAttribute(`style`, `border-radius: 5px; width: 100%; height: 100%;`);

            elem.output.appendChild(newElement);
          }
        });
      }
    });
  }
};

setAvatar(AVATAR_TARGETS);

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let map = document.querySelector(`.map`);
let templateCard = document.querySelector(`#card`).content;

let setCardTitle = function (cardName, cardNumber) {
  let templateCardtitle = cardName.querySelector(`.popup__title`);

  templateCardtitle.textContent = window.filter.getFilteredAds()[cardNumber].offer.title;
};

let setCardAddress = function (cardName, cardNumber) {
  let templateCardAddress = cardName.querySelector(`.popup__text--address`);

  templateCardAddress.textContent = window.filter.getFilteredAds()[cardNumber].offer.address;
};

let setCardPrice = function (cardName, cardNumber) {
  let templateCardPrice = cardName.querySelector(`.popup__text--price`);

  templateCardPrice.textContent = ``; // обнуляем старые значения
  templateCardPrice.textContent = (`${window.filter.getFilteredAds()[cardNumber].offer.price}₽ /ночь`);
};

let setCardType = function (cardName, cardNumber) {
  let templateCardType = cardName.querySelector(`.popup__type`);

  templateCardType.textContent = window.filter.getFilteredAds()[cardNumber].offer.TYPE;
};

let setCardCapacity = function (cardName, cardNumber) {
  let templateCardCapacity = cardName.querySelector(`.popup__text--capacity`);

  templateCardCapacity.textContent = `${window.filter.getFilteredAds()[cardNumber].offer.rooms} комнаты для ${window.filter.getFilteredAds()[cardNumber].offer.guests} гостей`;
};

let setCardTime = function (cardName, cardNumber) {
  let templateCardTime = cardName.querySelector(`.popup__text--time`);
  templateCardTime.textContent = `Заезд после ${window.filter.getFilteredAds()[cardNumber].offer.checkin}, выезд до ${window.filter.getFilteredAds()[cardNumber].offer.checkout}`;
};

let setCardFeatures = function (cardName, cardNumber) {
  let templateCardFeatures = cardName.querySelector(`.popup__features`);
  let fragmentsFeatures = document.createDocumentFragment();
  let currentPoolFeatures = window.filter.getFilteredAds()[cardNumber].offer.features;

  for (let j = 0; j < currentPoolFeatures.length; j++) {
    let createElementFeature = document.createElement(`li`);

    createElementFeature.classList.add(`popup__feature`, `popup__feature--${currentPoolFeatures[j]}`);
    fragmentsFeatures.appendChild(createElementFeature);
  }

  templateCardFeatures.textContent = ``; // обнуляем старые значения

  templateCardFeatures.appendChild(fragmentsFeatures);
};

let setCardDescription = function (cardName, cardNumber) {
  let templateCardDescription = cardName.querySelector(`.popup__description`);

  templateCardDescription.textContent = window.filter.getFilteredAds()[cardNumber].offer.description;
};

let setCardPhotos = function (cardName, cardNumber) {
  let fragmentsPhotos = document.createDocumentFragment();
  let currentPoolPhotos = window.filter.getFilteredAds()[cardNumber].offer.photos;
  let templateCardPhotos = cardName.querySelector(`.popup__photos`);

  for (let j = 0; j < currentPoolPhotos.length; j++) {
    let createElementPhoto = document.createElement(`img`);

    createElementPhoto.style.src = currentPoolPhotos[j];
    createElementPhoto.style.width = `45px`;
    createElementPhoto.style.height = `40px`;
    createElementPhoto.alt = `Фотография жилья`;
    createElementPhoto.src = currentPoolPhotos[j];

    createElementPhoto.classList.add(`popup__photo`);
    fragmentsPhotos.appendChild(createElementPhoto);
  }

  templateCardPhotos.textContent = ``; // обнуляем старые значения

  templateCardPhotos.appendChild(fragmentsPhotos);
};

let setCardAvatar = function (cardName, cardNumber) {
  let templateCardAvatar = cardName.querySelector(`.popup__avatar`);

  templateCardAvatar.src = window.filter.getFilteredAds()[cardNumber].author.avatar;
};

let renderCard = function (evt) {
  let mapCard = document.querySelector(`.map__card`);

  if (!evt || !evt.target.dataset.id) {
    return;
  }

  if (mapCard) {
    mapCard.remove();
  }

  let newCard = templateCard.cloneNode(true);
  let id = evt.target.dataset.id;

  setCardTitle(newCard, id);
  setCardAddress(newCard, id);
  setCardPrice(newCard, id);
  setCardType(newCard, id);
  setCardCapacity(newCard, id);
  setCardTime(newCard, id);
  setCardFeatures(newCard, id);
  setCardDescription(newCard, id);
  setCardPhotos(newCard, id);
  setCardAvatar(newCard, id);

  map.appendChild(newCard);

  document.addEventListener(`keydown`, window.handlers.renderedCardCloseHandler);

  window.handlers.setCardCloseHandler();
};

window.card = {
  renderCard,
};

})();

(() => {
/*!**********************!*\
  !*** ./js/filter.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEFAULT_FILTER_VALUE = `any`;

const filters = {
  'housing-type': DEFAULT_FILTER_VALUE,
  'housing-price': DEFAULT_FILTER_VALUE,
  'housing-rooms': DEFAULT_FILTER_VALUE,
  'housing-guests': DEFAULT_FILTER_VALUE,
  'features': {
    'filter-wifi': {key: `wifi`, value: false},
    'filter-dishwasher': {key: `dishwasher`, value: false},
    'filter-parking': {key: `parking`, value: false},
    'filter-washer': {key: `washer`, value: false},
    'filter-elevator': {key: `elevator`, value: false},
    'filter-conditioner': {key: `conditioner`, value: false},
  },
};

let priceMap = {
  low: {min: 0, max: 10000},
  middle: {min: 9999, max: 50001},
  high: {min: 50000, max: 1000000},
};
let filteredAds;

let getFilteredAds = function () {
  return filteredAds;
};

let checkFeature = function (item) {
  for (let featureKey in filters.features) {
    if (filters.features[featureKey].value
      && !item.offer.features.includes(filters.features[featureKey].key)
    ) {
      return false;
    }
  }

  return true;
};

let filterPrice = function (item) {
  return filters[`housing-price`] === DEFAULT_FILTER_VALUE
    || item.offer.price > priceMap[filters[`housing-price`]].min && item.offer.price < priceMap[filters[`housing-price`]].max;
};

let filterType = function (item) {
  return filters[`housing-type`] === DEFAULT_FILTER_VALUE || filters[`housing-type`] === item.offer.type;
};

let filterRooms = function (item) {
  return filters[`housing-rooms`] === DEFAULT_FILTER_VALUE || parseInt(filters[`housing-rooms`], 10) === item.offer.rooms;
};

let filterGuests = function (item) {
  return filters[`housing-guests`] === DEFAULT_FILTER_VALUE || parseInt(filters[`housing-guests`], 10) === item.offer.guests;
};

const updateData = function () {
  filteredAds = window.request.getData().filter(function (item) {
    return filterPrice(item) && filterType(item) && filterRooms(item) && filterGuests(item) && checkFeature(item);
  });

  window.pin.renderPins(filteredAds);
};


let setFilterChangeCather = function () {
  document.querySelector(`.map__filters`).addEventListener(`change`, function (evt) {
    document.querySelectorAll(`button[data-id]`).forEach(function (pin) {
      pin.remove();
    });

    if (document.querySelector(`.map__card`)) {
      document.querySelector(`.map__card`).remove();
    }

    if (evt.target.id in filters) {
      filters[evt.target.id] = evt.target.value;
    } else if (evt.target.id in filters.features) {
      filters.features[evt.target.id].value = !filters.features[evt.target.id].value;
    }

    window.debounce.fixDebounce(updateData);
  });
};

setFilterChangeCather();

window.filter = {
  updateData,
  getFilteredAds,
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const MAX_AD_QTY = 5;

let renderPins = function (data) {
  let fragment = document.createDocumentFragment();
  let maxAdQuantity = Math.min(data.length, MAX_AD_QTY);

  for (let pinNum = 0; pinNum < maxAdQuantity; pinNum++) {
    let newPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
    let avatarImg = newPin.querySelector(`img`);

    newPin.style.left = (data[pinNum].location.x - 20) + `px`;
    newPin.style.top = (data[pinNum].location.y - 40) + `px`;
    newPin.dataset.id = pinNum;

    avatarImg.src = data[pinNum].author.avatar;
    avatarImg.alt = data[pinNum].offer.title;
    avatarImg.dataset.id = pinNum;

    fragment.appendChild(newPin);
  }

  return document.querySelector(`.map__pins`).appendChild(fragment);
};

window.pin = {
  renderPins,
};


})();

(() => {
/*!***********************!*\
  !*** ./js/pinMove.js ***!
  \***********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let pinHandle = document.querySelector(`.map__pin--main`);

pinHandle.addEventListener(`mousedown`, function (evt) {

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let dragged = false;

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    let checkerCoords = function (coord, min, max) {
      coord = parseInt(coord, 10);

      if (coord > max) {
        return max;
      } else {
        if (coord < min) {
          return min;
        }

        return coord;
      }
    };

    pinHandle.style.top = checkerCoords((pinHandle.offsetTop - shift.y), 192, 692) + `px`; // тк pin на абсолюте, создаем сдвиг
    pinHandle.style.left = checkerCoords((pinHandle.offsetLeft - shift.x), 0, 1130) + `px`;

    window.handlers.setCurrentAddress();
  };

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
      let onClickPreventDefault = function (clickEvt) {
        clickEvt.preventDefault();
        pinHandle.removeEventListener(`click`, onClickPreventDefault);
      };
      pinHandle.addEventListener(`click`, onClickPreventDefault);
    }
  };


  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
});


})();

(() => {
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const ROOMS_TO_GUESTS_MAP = {
  '1': [`1`],
  '2': [`1`, `2`],
  '3': [`1`, `2`, `3`],
  '100': [`0`]
};
const EARLY_CHECKTIME = `12:00`;
const MIDDLE_CHECKTIME = `13:00`;
const LATE_CHECKTIME = `14:00`;
const MIN_PRICE_BUNGALOW = 0;
const MIN_PRICE_FLAT = 1000;
const MIN_PRICE_HOUSE = 5000;
const MIN_PRICE_PALACE = 10000;

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

})();

(() => {
/*!************************!*\
  !*** ./js/debounce.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


const DEBOUNCE_INTERVAL = 500; // ms

let lastTimeout;

let fixDebounce = function (cb) {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL);

};

window.debounce = {
  fixDebounce,
};

})();

/******/ })()
;