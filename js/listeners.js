'use strict';

(function () {

  /* Вешаем обработчики событий на карточку объявления*/

  let setRenderedCardListeners = function () {
    document.querySelector(`.map__pins`).addEventListener(`click`, window.card.renderCard); // браузер автоматически передает параметр event, т.к. он там есть

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

  /* Вешаем обработчики событий на Notice скуцию*/

  let mapPin = document.querySelector(`.map__pin--main`);
  let mapFaded = document.querySelector(`.map--faded`);
  let mapFilters = document.querySelectorAll(`.map__filter`);
  let mapFeaures = document.querySelector(`.map__features`);
  let mapAdFormDisabled = document.querySelector(`.ad-form--disabled`);
  let adFormAll = document.querySelectorAll(`.ad-form__element`);
  let currentAddress = document.querySelector(`#address`);

  let adFormDisable = function () {
    for (let i of adFormAll) {
      i.setAttribute(`disabled`, `disabled`);
    }
    for (let i of mapFilters) {
      i.setAttribute(`disabled`, `disabled`);
    }
    mapFeaures.setAttribute(`disabled`, `disabled`);
  };

  let adFormEnable = function () {
    for (let i of adFormAll) {
      i.removeAttribute(`disabled`);
    }
    for (let i of mapFilters) {
      i.removeAttribute(`disabled`);
    }
    mapFeaures.removeAttribute(`disabled`);
  };

  let setCurrentAddress = function () {
    currentAddress.value = (`${mapPin.style.left.replace(/px/, ``) - 32}, ${mapPin.style.top.replace(/px/, ``) - 62}`);
    currentAddress.setAttribute(`readonly`, `readonly`);
  };

  adFormDisable();


  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1 && document.querySelector(`.map--faded`)) {
      setCurrentAddress();
      adFormActivateAll();
    }
  });

  mapPin.addEventListener(`keydown`, function (evt) {
    if (evt.code === `Enter` && document.querySelector(`.map--faded`)) {
      setCurrentAddress();
      adFormActivateAll();
    }
  });


  let adFormActivateAll = function () {
    mapFaded.classList.remove(`map--faded`);
    mapAdFormDisabled.classList.remove(`ad-form--disabled`);
    window.loadData.getServerData(window.pin.renderPins); // т.о. запускаем ф-цию отрисовки коллбэком после получения 200 ответа с сервера
    adFormEnable();
    window.card.renderCard();
  };

  window.listeners = {
    setCurrentAddress
  };
})();
