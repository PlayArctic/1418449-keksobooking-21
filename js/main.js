'use strict';

/* Готовим массив данных для загрузки на сайт */
/* {
  "author": {
      "avatar": строка, адрес изображения вида img/avatars/user{{xx}}.png, где {{xx}} это число от 1 до 8 с ведущим нулём. Например, 01, 02 и т. д. Адреса изображений не повторяются
  },
  "offer": {
      "title": строка, заголовок предложения
      "address": строка, адрес предложения. Для простоты пусть пока представляет собой запись вида "{{location.x}}, {{location.y}}", например, "600, 350"
      "price": число, стоимость
      "type": строка с одним из четырёх фиксированных значений: palace, flat, house или bungalow
      "rooms": число, количество комнат
      "guests": число, количество гостей, которое можно разместить
      "checkin": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00,
      "checkout": строка с одним из трёх фиксированных значений: 12:00, 13:00 или 14:00
      "features": массив строк случайной длины из ниже предложенных: "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner",
      "description": строка с описанием,
      "photos": массив строк случайной длины, содержащий адреса фотографий "http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"
  },
  "location": {
      "x": случайное число, координата x метки на карте. Значение ограничено размерами блока, в котором перетаскивается метка.
      "y": случайное число, координата y метки на карте от 130 до 630.
  }
}  */
// eslint-disable-next-line object-curly-spacing
const AVATAR = [{ avatar: `img/avatars/user01.png` }, { avatar: `img/avatars/user02.png` }, { avatar: `img/avatars/user03.png` }, { avatar: `img/avatars/user04.png` }, { avatar: `img/avatars/user05.png` }, { avatar: `img/avatars/user06.png` }, { avatar: `img/avatars/user07.png` }, { avatar: `img/avatars/user08.png` }];
// eslint-disable-next-line object-curly-spacing
const TYPE = [{ type: `palace` }, { type: `flat` }, { type: `house` }, { type: `bungalow` }];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let map = document.querySelector(`.map`);

let getRandomNumber = function (min, max) {
  return Math.round(((Math.random() * (max - min)) + min));
};

let getPhotoset = function (photos = 5) {
  let photoSet = [];
  for (let j = 0; j < getRandomNumber(1, photos); j++) {
    /* let photo = `http://o0.github.io/assets/images/tokyo/hotel${j}.jpg`;
    photoSet.push(photo); */
    photoSet.push(`http://o0.github.io/assets/images/tokyo/hotel${j}.jpg`);
  }
  return photoSet;
};

let getData = function () {
  let adDataStorage = [];
  for (let i = 0; i < 8; i++) {
    let adData = {
      "author": {
        "avatar": AVATAR[i].avatar,
      },
      "offer": {
        "title": `Заголовок предложения ${i + 1}`,
        "address": `${getRandomNumber(0, 600)}, ${getRandomNumber(0, 350)}`,
        "price": `${getRandomNumber(1000, 50000)}`,
        "type": TYPE[getRandomNumber(0, 3)],
        "rooms": getRandomNumber(1, 4),
        "guests": getRandomNumber(1, 3),
        "checkin": CHECKIN[getRandomNumber(0, 2)],
        "checkout": CHECKOUT[getRandomNumber(0, 2)],
        "features": FEATURES.slice(0, getRandomNumber(1, 5)),
        "description": `Строка с описанием ${i + 1}`,
        "photos": getPhotoset(),
      },
      "location": {
        "x": getRandomNumber(130, 1200),
        "y": getRandomNumber(130, 630),
      }
    };
    adDataStorage.push(adData);
  }
  return adDataStorage;
};

let dataSource = getData();

/* Отрисовываем Pins */

/* <template id="pin">
<button type="button" class="map__pin" style="left: 200px; top: 400px;">
  <img src="img/avatars/user07.png" width="40" height="40" draggable="false" alt="Метка объявления">
</button>
</template>


Координаты: style="left: {{location.x + смещение по X}}px; top: {{location.y + смещение по Y}}px;"
У изображения метки укажите:
Аватар: src="{{author.avatar}}"
Альтернативный текст: alt="{{заголовок объявления}}"


Отрисуйте сгенерированные DOM-элементы в блок .map__pins. Для вставки элементов используйте DocumentFragment.
*/

let renderPins = function () {
  let templatePinButton = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let poolPins = document.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < 8; i++) {
    let newPin = templatePinButton.cloneNode(true);
    newPin.style.left = (dataSource[i].location.x - 20) + `px`;
    newPin.style.top = (dataSource[i].location.y - 40) + `px`;
    let avatarImg = newPin.querySelector(`img`);
    avatarImg.src = dataSource[i].author.avatar;
    avatarImg.alt = dataSource[i].offer.title;
    fragment.appendChild(newPin);
  }

  return poolPins.appendChild(fragment);
};

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

<template id="card">
    <article class="map__card popup">
      <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
      <button type="button" class="popup__close">Закрыть</button>
      <h3 class="popup__title">Уютное гнездышко для молодоженов</h3>
      <p class="popup__text popup__text--address">102-0082 Tōkyō-to, Chiyoda-ku, Ichibanchō, 14−3</p>
      <p class="popup__text popup__text--price">5200₽<span>/ночь</span></p>
      <h4 class="popup__type">Квартира</h4>
      <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
      <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
      <ul class="popup__features">
        <li class="popup__feature popup__feature--wifi"></li>
        <li class="popup__feature popup__feature--dishwasher"></li>
        <li class="popup__feature popup__feature--parking"></li>
        <li class="popup__feature popup__feature--washer"></li>
        <li class="popup__feature popup__feature--elevator"></li>
        <li class="popup__feature popup__feature--conditioner"></li>
      </ul>
      <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
      <div class="popup__photos">
        <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
      </div>
    </article>
  </template>
*/

let setCardTitle = function (cardName, cardNumber) {
  let templateCardtitle = cardName.querySelector(`.popup__title`);
  templateCardtitle.textContent = dataSource[cardNumber].offer.title;
};

let setCardAddress = function (cardName, cardNumber) {
  let templateCardAddress = cardName.querySelector(`.popup__text--address`);
  templateCardAddress.textContent = dataSource[cardNumber].offer.address;
};

let setCardPrice = function (cardName, cardNumber) {
  let templateCardPrice = cardName.querySelector(`.popup__text--price`);
  templateCardPrice.textContent = []; // обнуляем старые значения
  templateCardPrice.innerHTML = (`${dataSource[cardNumber].offer.price}₽<span> /ночь</span>`);
};

let setCardType = function (cardName, cardNumber) {
  let templateCardType = cardName.querySelector(`.popup__type`);
  templateCardType.textContent = dataSource[cardNumber].offer.TYPE;
};

let setCardCapacity = function (cardName, cardNumber) {
  let templateCardCapacity = cardName.querySelector(`.popup__text--capacity`);
  templateCardCapacity.textContent = `${dataSource[cardNumber].offer.rooms} комнаты для ${dataSource[cardNumber].offer.guests} гостей`;
};

let setCardTime = function (cardName, cardNumber) {
  let templateCardTime = cardName.querySelector(`.popup__text--time`);
  templateCardTime.textContent = `Заезд после ${dataSource[cardNumber].offer.checkin}, выезд до ${dataSource[cardNumber].offer.checkout}`;
};

let setCardFeatures = function (cardName, cardNumber) {
  let templateCardFeatures = cardName.querySelector(`.popup__features`);
  let fragmentsFeatures = document.createDocumentFragment();
  let currentPoolFeatures = dataSource[cardNumber].offer.features;

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
  templateCardDescription.textContent = dataSource[cardNumber].offer.description;
};

let setCardPhotos = function (cardName, cardNumber) {
  let fragmentsPhotos = document.createDocumentFragment();
  let currentPoolPhotos = dataSource[cardNumber].offer.photos;
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
  templateCardAvatar.style.src = dataSource[cardNumber].author.avatar;
};

let renderCard = function () {
  for (let i = 0; i < 1; i++) { // по заданию ограничиваем до одного объявления
    let templateCard = document.querySelector(`#card`).content;
    let newCard = templateCard.cloneNode(true);

    setCardTitle(newCard, i);
    setCardAddress(newCard, i);
    setCardPrice(newCard, i);
    setCardType(newCard, i);
    setCardCapacity(newCard, i);
    setCardTime(newCard, i);
    setCardFeatures(newCard, i);
    setCardDescription(newCard, i);
    setCardPhotos(newCard, i);
    setCardAvatar(newCard, i);
    map.appendChild(newCard);
  }
};

/* Вешаем обработчики событий*/

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
  currentAddress.value = (`${mapPin.style.left.replace(/px/, ``) - 32}, ${mapPin.style.top.replace(/px/, ``) - 70}`);
};

adFormDisable();

if (mapFaded) {
  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      adFormActicateAll();
      setCurrentAddress();
    }
  });

  mapPin.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      adFormActicateAll();
    }
  });
}

let adFormActicateAll = function () {
  mapFaded.classList.remove(`map--faded`);
  mapAdFormDisabled.classList.remove(`ad-form--disabled`);
  renderPins();
  // renderCard();
  adFormEnable();
};

/* Запускаем итоговые функции */
