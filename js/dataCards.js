'use strict';

(function () {

  /* Данные для отрисовки карточки */

  /*
  На основе первого по порядку элемента из сгенерированного массива и шаблона #card создайте DOM-элемент объявления (карточка объявления),
  заполните его данными из объекта:

  -Выведите заголовок объявления offer.title в заголовок .popup__title.
  -Выведите адрес offer.address в блок .popup__text--address.
  -Выведите цену offer.price в блок .popup__text--price строкой вида {{offer.price}}₽/ночь. Например, 5200₽/ночь.

  -В блок .popup__type выведите тип жилья offer.type: Квартира для flat, Бунгало для bungalow, Дом для house, Дворец для palace.
  -Выведите количество гостей и комнат offer.rooms и offer.guests в блок .popup__text--capacity строкой вида {{offer.rooms}} комнаты для {{offer.guests}} гостей.
  Например, 2 комнаты для 3 гостей.
  -Время заезда и выезда offer.checkin и offer.checkout в блок .popup__text--time строкой вида Заезд после {{offer.checkin}}, выезд до {{offer.checkout}}.
  Например, заезд после 14:00, выезд до 12:00.
  -В список .popup__features выведите все доступные удобства в объявлении.
  -В блок .popup__description выведите описание объекта недвижимости offer.description.
  -В блок .popup__photos выведите все фотографии из списка offer.photos. Каждая из строк массива photos должна записываться как src соответствующего изображения.
  -Замените src у аватарки пользователя — изображения, которое записано в .popup__avatar — на значения поля author.avatar отрисовываемого объекта.

  Если данных для заполнения не хватает, соответствующий блок в карточке скрывается.

  Вставьте полученный DOM-элемент в блок .map перед блоком.map__filters-container.
  */

  let map = document.querySelector(`.map`);

  let setCardTitle = function (cardName, cardNumber) {
    let templateCardtitle = cardName.querySelector(`.popup__title`);
    templateCardtitle.textContent = window.dataService.dataSource[cardNumber].offer.title;
  };

  let setCardAddress = function (cardName, cardNumber) {
    let templateCardAddress = cardName.querySelector(`.popup__text--address`);
    templateCardAddress.textContent = window.dataService.dataSource[cardNumber].offer.address;
  };

  let setCardPrice = function (cardName, cardNumber) {
    let templateCardPrice = cardName.querySelector(`.popup__text--price`);
    templateCardPrice.textContent = []; // обнуляем старые значения
    templateCardPrice.innerHTML = (`${window.dataService.dataSource[cardNumber].offer.price}₽<span> /ночь</span>`);
  };

  let setCardType = function (cardName, cardNumber) {
    let templateCardType = cardName.querySelector(`.popup__type`);
    templateCardType.textContent = window.dataService.dataSource[cardNumber].offer.TYPE;
  };

  let setCardCapacity = function (cardName, cardNumber) {
    let templateCardCapacity = cardName.querySelector(`.popup__text--capacity`);
    templateCardCapacity.textContent = `${window.dataService.dataSource[cardNumber].offer.rooms} комнаты для ${window.dataService.dataSource[cardNumber].offer.guests} гостей`;
  };

  let setCardTime = function (cardName, cardNumber) {
    let templateCardTime = cardName.querySelector(`.popup__text--time`);
    templateCardTime.textContent = `Заезд после ${window.dataService.dataSource[cardNumber].offer.checkin}, выезд до ${window.dataService.dataSource[cardNumber].offer.checkout}`;
  };

  let setCardFeatures = function (cardName, cardNumber) {
    let templateCardFeatures = cardName.querySelector(`.popup__features`);
    let fragmentsFeatures = document.createDocumentFragment();
    let currentPoolFeatures = window.dataService.dataSource[cardNumber].offer.features;

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
    templateCardDescription.textContent = window.dataService.dataSource[cardNumber].offer.description;
  };

  let setCardPhotos = function (cardName, cardNumber) {
    let fragmentsPhotos = document.createDocumentFragment();
    let currentPoolPhotos = window.dataService.dataSource[cardNumber].offer.photos;
    let templateCardPhotos = cardName.querySelector(`.popup__photos`);

    for (let j = 0; j < currentPoolPhotos.length; j++) {
      let createElementPhoto = document.createElement(`img`);
      createElementPhoto.style.src = currentPoolPhotos[j];
      createElementPhoto.style.width = `45px`;
      createElementPhoto.style.height = `40px`;
      /* createElementPhoto.setAttribute = (`alt`, `Фотография жилья`); // setAttribute это функция в которую нужно передавать параметры а не присваивать что-то*/
      createElementPhoto.alt = `Фотография жилья`;
      createElementPhoto.classList.add(`popup__photo`);
      fragmentsPhotos.appendChild(createElementPhoto);
    }

    templateCardPhotos.textContent = []; // обнуляем старые значения
    templateCardPhotos.appendChild(fragmentsPhotos);
  };

  let setCardAvatar = function (cardName, cardNumber) {
    let templateCardAvatar = cardName.querySelector(`.popup__avatar`);
    templateCardAvatar.src = window.dataService.dataSource[cardNumber].author.avatar;
  };

  let renderCard = function (evt) {
    if (evt.target.dataset.id) {
      let templateCard = document.querySelector(`#card`).content;
      let newCard = templateCard.cloneNode(true);
      let id = evt.target.dataset.id;

      if (document.querySelector(`.map__card`)) { // удаляем предыдущее объявление
        document.querySelector(`.map__card`).remove();
      }

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
    }

    if (document.querySelector(`.popup__close`)) {
      document.querySelector(`.popup__close`).addEventListener(`click`, function () {
        document.querySelector(`.map__card`).remove();
      });
    }
  };

  window.dataCards = {
    renderCard,
  };

})();
