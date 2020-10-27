'use strict';

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
    createElementPhoto.classList.add(`popup__photo`);
    createElementPhoto.src = currentPoolPhotos[j];
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
  if (!evt || !evt.target.dataset.id) { // вся ф-ция заканчивается после return - если не получаем evt или dataset.id
    return;
  }

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

  if (document.querySelector(`.popup__close`)) {
    document.querySelector(`.popup__close`).addEventListener(`click`, function () {
      document.querySelector(`.map__card`).remove();
    });
  }
};

window.card = {
  renderCard,
};
