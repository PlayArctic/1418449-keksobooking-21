'use strict';

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
