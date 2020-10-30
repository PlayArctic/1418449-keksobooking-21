/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
(() => {
/*!**********************!*\
  !*** ./js/avatar.js ***!
  \**********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let FILE_TYPES = [`jpg`, `jpeg`, `png`, `gif`];

let avatarChooser = document.querySelector(`.ad-form-header__input`);
let avatarPreview = document.querySelector(`.ad-form-header__preview img`);
let adPhotoChooser = document.querySelector(`.ad-form__input`);
let adPhotoPreview = document.querySelector(`.ad-form__photo`);

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

setAvatar(avatarChooser, avatarPreview);
setAvatar(adPhotoChooser, adPhotoPreview);

})();

(() => {
/*!********************!*\
  !*** ./js/card.js ***!
  \********************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let map = document.querySelector(`.map`);


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
  templateCardPrice.textContent = []; // обнуляем старые значения
  templateCardPrice.innerHTML = (`${window.filter.getFilteredAds()[cardNumber].offer.price}₽<span> /ночь</span>`);
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

  templateCardFeatures.textContent = []; // обнуляем старые значения

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

  templateCardPhotos.textContent = []; // обнуляем старые значения

  templateCardPhotos.appendChild(fragmentsPhotos);
};

let setCardAvatar = function (cardName, cardNumber) {
  let templateCardAvatar = cardName.querySelector(`.popup__avatar`);
  templateCardAvatar.src = window.filter.getFilteredAds()[cardNumber].author.avatar;
};

let renderCard = function (evt) {
  let mapCard = document.querySelector(`.map__card`);

  if (!evt || !evt.target.dataset.id) { // вся ф-ция заканчивается после return - если не получаем evt или dataset.id (id это начинка dataset)
    return;
  }

  if (mapCard) { // удаляем предыдущее объявление
    mapCard.remove();
  }

  let templateCard = document.querySelector(`#card`).content;
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

  setCardCloseListener();
};

let setCardCloseListener = function () {
  let popupCloseButton = document.querySelector(`.popup__close`);
  let popupCard = document.querySelector(`.map__card`);

  popupCloseButton.addEventListener(`click`, function () {
    popupCard.remove();
  });
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
let filters = {
  type: DEFAULT_FILTER_VALUE,
  price: DEFAULT_FILTER_VALUE,
  rooms: DEFAULT_FILTER_VALUE,
  guests: DEFAULT_FILTER_VALUE,
  features: {
    wifi: false,
    dishwasher: false,
    parking: false,
    washer: false,
    elevator: false,
    conditioner: false,
  },
};

let filteredAds;

let getFilteredAds = function () {
  return filteredAds;
};

let featureChecker = function (item) { // !логика для несклольких filters.feature сразу
  for (let featureKey in filters.features) {
    if (filters.features[featureKey] && !item.offer.features.includes(featureKey)) { // если значение true но его нет в features item'a то сразу false
      return false;
    }
  }

  return true;
};

let priceMap = {
  low: {min: 0, max: 10000},
  middle: {min: 9999, max: 50001},
  high: {min: 50000, max: 1000000},
};

let filterPrice = function (item) { // !!!
  return filters.price === DEFAULT_FILTER_VALUE
    || item.offer.price > priceMap[filters.price].min && item.offer.price < priceMap[filters.price].max;
};

let filterType = function (item) {
  return filters.type === DEFAULT_FILTER_VALUE || filters.type === item.offer.type;
};

let filterRooms = function (item) {
  return filters.rooms === DEFAULT_FILTER_VALUE || parseInt(filters.rooms, 10) === item.offer.rooms;
};

let filterGuests = function (item) {
  return filters.guests === DEFAULT_FILTER_VALUE || parseInt(filters.guests, 10) === item.offer.guests;
};

const updateData = function () {
  filteredAds = window.loadData.getData().filter(function (item) { // фильтр возвращает новый массив return которых будет true
    return filterPrice(item) && filterType(item) && filterRooms(item) && filterGuests(item) && featureChecker(item);
  });
  window.pin.renderPins(filteredAds);
};


let filterChangeCather = function () {
  document.querySelector(`.map__filters`).addEventListener(`change`, function (evt) {
    document.querySelectorAll(`button[data-id]`).forEach(function (pin) { // элементы button которые содержат атрибут data-id
      pin.remove();
    });

    if (document.querySelector(`.map__card`)) {
      document.querySelector(`.map__card`).remove();
    }

    switch (evt.target.id) {
      case `housing-type`:
        filters.type = evt.target.value;
        break;
      case `housing-price`:
        filters.price = evt.target.value;
        break;
      case `housing-rooms`:
        filters.rooms = evt.target.value;
        break;
      case `housing-guests`:
        filters.guests = evt.target.value;
        break;
      case evt.target.value :

        if (evt.target.value in filters.features) {
          filters.features[evt.target.value] = !filters.features[evt.target.value]; // .substring(evt.target.id.indexOf(`-`), evt.target.id.length)]
        }

        break;
    }

    window.debounce.fixDebounce(updateData); // передаем невызванную ф-цию updateData а не updateData(). до этого был результат вызова ф-ции в связи с чем вылетала ошибка
  });
};

filterChangeCather();

window.filter = {
  updateData,
  getFilteredAds,
};

})();

(() => {
/*!************************!*\
  !*** ./js/loadData.js ***!
  \************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


let data = [];
let getData = function () {
  return data;
};

let errorCallback = function (errorMessage) {
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

let getServerData = function (afterSuccsessCallback) {
  let URL_LOAD_ADDRES = `https://21.javascript.pages.academy/keksobooking/data`;
  const WRONG_REQUEST_CODE = 400;
  const NOT_AUTHORIZED_CODE = 401;
  const NOT_FOUND_CODE = 404;
  let error;

  return fetch(URL_LOAD_ADDRES)
    .then(function (response) {
      if (response.status >= 400) {
        switch (response.status) {
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
            error = `Cтатус ответа: : ` + response.status + ` ` + response.statusText;
        }

        return errorCallback(error);
      }

      return response.json()
        .then(function (clientData) {
          data = clientData.filter((item) => item.offer); // оставляем только те что содержат item.offer
          afterSuccsessCallback(data);
        });
    });
};

window.loadData = {
  getServerData,
  getData
};

})();

(() => {
/*!*************************!*\
  !*** ./js/listeners.js ***!
  \*************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


/* Вешаем обработчики событий на карточку объявления*/

let setRenderedCardListeners = function () {
  document.querySelector(`.map__pins`).addEventListener(`click`, window.card.renderCard); // браузер автоматически передает параметр event, т.к. он там есть. и автоматом когда срабатывает обработчик вызывает ф-цию

  document.querySelector(`.map__pins`).addEventListener(`keydown`, function (evt) {
    if (evt.code === `Enter`) {
      window.card.renderCard(evt);
    }
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.code === `Escape` && document.querySelector(`.map__card`)) {
      document.querySelector(`.map__card`).remove();
    }
  });
};

setRenderedCardListeners();

/* Вешаем обработчики событий на Notice скцию*/

let mapPin = document.querySelector(`.map__pin--main`);
let mapFaded = document.querySelector(`.map--faded`);
let map = document.querySelector(`.map`);
let mapFilters = document.querySelectorAll(`.map__filter`);
let mapFeaures = document.querySelector(`.map__features`);
let adForm = document.querySelector(`.ad-form`);
let mapAdFormDisabled = document.querySelector(`.ad-form--disabled`);
let adFormAll = document.querySelectorAll(`.ad-form__element`);
let currentAddress = document.querySelector(`#address`);
let resetButton = document.querySelector(`.ad-form__reset`);


let adFormDisable = function () {
  for (let feature of adFormAll) {
    feature.setAttribute(`disabled`, `disabled`);
  }
  for (let feature of mapFilters) {
    feature.setAttribute(`disabled`, `disabled`);
  }

  mapFeaures.setAttribute(`disabled`, `disabled`);
};

let adFormEnable = function () {
  for (let feature of adFormAll) {
    feature.removeAttribute(`disabled`);
  }
  for (let feature of mapFilters) {
    feature.removeAttribute(`disabled`);
  }

  mapFeaures.removeAttribute(`disabled`);
};

let setCurrentAddress = function () {
  currentAddress.value = (`${mapPin.style.left.replace(/px/, ``) - 32}, ${mapPin.style.top.replace(/px/, ``) - 62}`);
  currentAddress.setAttribute(`readonly`, `readonly`);
};

adFormDisable();

let activateAllAdForm = function () {
  mapFaded.classList.remove(`map--faded`);
  mapAdFormDisabled.classList.remove(`ad-form--disabled`);
  // window.loadData.getServerData(window.pin.renderPins); // т.о. запускаем ф-цию отрисовки коллбэком после получения 200 ответа с сервера
  window.loadData.getServerData(window.filter.updateData);
  adFormEnable();
  window.card.renderCard();
};

let deactivateAllAdForm = function () {
  adForm.reset();
  adForm.classList.add(`ad-form--disabled`);
  map.classList.add(`map--faded`);
  document.querySelectorAll(`.map__pin[type=button]`).forEach(function (node) {
    node.remove();
  });
  mapPin.style.left = `570px`;
  mapPin.style.top = `375px`;
};

mapPin.addEventListener(`mousedown`, function (evt) {
  if (evt.which === 1 && document.querySelector(`.map--faded`)) {
    setCurrentAddress();
    activateAllAdForm();
  }
});

mapPin.addEventListener(`keydown`, function (evt) {
  if (evt.code === `Enter` && document.querySelector(`.map--faded`)) {
    setCurrentAddress();
    activateAllAdForm();
  }
});

resetButton.addEventListener(`click`, deactivateAllAdForm);

window.listeners = {
  setCurrentAddress,
  deactivateAllAdForm
};

})();

(() => {
/*!*******************!*\
  !*** ./js/pin.js ***!
  \*******************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */



let renderPins = function (data) {
  let templatePinButton = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let poolPins = document.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();
  let maxAdQuantity = Math.min(data.length, 5);

  for (let pinNum = 0; pinNum < maxAdQuantity; pinNum++) {
    let newPin = templatePinButton.cloneNode(true);
    let avatarImg = newPin.querySelector(`img`);

    newPin.setAttribute(`data-id`, pinNum); // логический блок

    newPin.style.left = (data[pinNum].location.x - 20) + `px`; // логический блок
    newPin.style.top = (data[pinNum].location.y - 40) + `px`;
    avatarImg.src = data[pinNum].author.avatar;
    avatarImg.alt = data[pinNum].offer.title;

    avatarImg.setAttribute(`data-id`, pinNum); // логический блок
    fragment.appendChild(newPin);
  }

  return poolPins.appendChild(fragment);
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
    x: evt.clientX, // положение мыши на экране
    y: evt.clientY
  };

  let dragged = false; // флаг для отлова движения

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    dragged = true;

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = { // цепочка обсластей видимости. записываем в родительский startCoords
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

      // return coord > max
      //   ? max
      //   : coord < min
      //     ? min
      //     : coord;
    };

    pinHandle.style.top = checkerCoords((pinHandle.offsetTop - shift.y), 130, 630) + `px`; // тк pin на абсолюте, создаем сдвиг
    pinHandle.style.left = checkerCoords((pinHandle.offsetLeft - shift.x), 0, 1130) + `px`;
    window.listeners.setCurrentAddress();
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


  document.addEventListener(`mousemove`, onMouseMove); // именно на document. так как движение и отжатие отслеживаем на всей странице
  document.addEventListener(`mouseup`, onMouseUp);
});


})();

(() => {
/*!**************************!*\
  !*** ./js/uploadData.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */

let URL_UPLOAD_ADDRES = `https://21.javascript.pages.academy/keksobooking`;

let uploadData = function (data) { // data это то что передаем на сервер, см. ниже
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
        onSuccessSendCallback();
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
      errorCallback(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    errorCallback(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    errorCallback(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = 10000;

  xhr.open(`POST`, URL_UPLOAD_ADDRES);
  xhr.send(data); // отправка данных data на сервер
};

let onSuccessSendCallback = function () {
  let node = document.querySelector(`#success`).content;
  let newNode = node.cloneNode(true).querySelector(`.success`); // без повторного поиска внутри клонноды .querySelector(`.success`)не добавляется элемент в body
  newNode.classList.add(`overlay`);
  document.body.insertAdjacentElement(`afterbegin`, newNode);

  document.querySelector(`.overlay`).addEventListener(`click`, function () {
    this.remove(); // !работает, но линтеру не нравится
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.code === `Escape`) {
      document.querySelector(`.overlay`).remove();
    }
  });
};

let errorCallback = function (error) {
  let node = document.querySelector(`#error`).content;
  let newNode = node.cloneNode(true);

  newNode.querySelector(`.error`).classList.add(`overlay`);
  newNode.querySelector(`.error__message`).textContent = error;
  document.body.appendChild(newNode); // document.body.insertAdjacentElement(`afterbegin`, newNode); не сработало

  document.querySelector(`.overlay`).addEventListener(`click`, function () {
    this.remove(); // !работает, но линтеру не нравится
  });

  document.addEventListener(`keydown`, function (evt) {
    if (evt.code === `Escape` && document.querySelector(`.overlay`)) {
      document.querySelector(`.overlay`).remove();
    }
  });

  document.querySelector(`.error__button`).addEventListener(`click`, function (evt) {
    if (evt.code === `Escape`) {
      document.querySelector(`.overlay`).remove();
    }
  });
};


let form = document.querySelector(`#adForm`);
form.addEventListener(`submit`, function (evt) {
  evt.preventDefault();
  uploadData((new FormData(form))); // !!!
  window.listeners.deactivateAllAdForm();
});

window.upload = {
  uploadData
};

})();

(() => {
/*!**************************!*\
  !*** ./js/validation.js ***!
  \**************************/
/*! unknown exports (runtime-defined) */
/*! runtime requirements:  */


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
  let roomsCount = document.querySelector(`#room_number`).value;

  Array.from(document.querySelector(`#capacity`).options).forEach(function (option) {
    if (ROOMS_TO_GUESTS_MAP[roomsCount].includes(option.value)) {
      option.removeAttribute(`disabled`);
      option.setAttribute(`selected`, ``);
    }

    option.setAttribute(`disabled`, ``);
    option.removeAttribute(`selected`);
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


const DEBOUNCE_INTERVAL = 300; // ms

let lastTimeout;
let fixDebounce = function (cb) {
//  debugger;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout); // пока не выполнено это действия все остальные действия будут откидываться (п2)
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL); // метод setTimeout возвращает id установленного таймера (п1)

};

window.debounce = {
  fixDebounce,
};

})();

/******/ })()
;