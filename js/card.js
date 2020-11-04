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

  templateCardPrice.textContent = [];
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

  templateCardFeatures.textContent = [];

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

  templateCardPhotos.textContent = [];

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

  document.addEventListener(`keydown`, window.handlers.renderedCardCloseHandler);

  setCardCloseHandler();
};

let setCardCloseHandler = function () {
  let popupCloseButton = document.querySelector(`.popup__close`);
  let popupCard = document.querySelector(`.map__card`);

  popupCloseButton.addEventListener(`click`, function () {
    popupCard.remove();
  });
};

window.card = {
  renderCard,
};
