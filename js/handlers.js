'use strict';

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
  document.querySelector(`.map__pins`).addEventListener(`click`, mapPinHandler); // браузер автоматически передает параметр event, т.к. он там есть. и автоматом когда срабатывает обработчик вызывает ф-цию
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

  window.request.sendRequest(window.request.URL_LOAD_ADDRESS, window.filter.updateData, window.service.onErrorReceiveCallback);
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

  window.request.sendRequest(window.request.URL_UPLOAD_ADDRESS, window.service.onSuccessSendCallback,
      window.service.onErrorSendCallback, `POST`, (new FormData(form))); // FormData автоматически считывает поля из form

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

