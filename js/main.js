'use strict';

/* Готовим массив данных для загрузки на сайт */

// eslint-disable-next-line object-curly-spacing
const AVATAR = [{ avatar: `img/avatars/user01.png` }, { avatar: `img/avatars/user02.png` }, { avatar: `img/avatars/user03.png` }, { avatar: `img/avatars/user04.png` }, { avatar: `img/avatars/user05.png` }, { avatar: `img/avatars/user06.png` }, { avatar: `img/avatars/user07.png` }, { avatar: `img/avatars/user08.png` }];
// eslint-disable-next-line object-curly-spacing
const TYPES = [{ type: `palace` }, { type: `flat` }, { type: `house` }, { type: `bungalow` }];
const CHECKIN_PERIODS = [`12:00`, `13:00`, `14:00`];
const CHECKOUT_PERIODS = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
let map = document.querySelector(`.map`);

let getRandomNumber = function (min, max) {
  return Math.round(((Math.random() * (max - min)) + min));
};

let getPhotoset = function (photos = 5) {
  let photoSet = [];
  for (let j = 0; j < getRandomNumber(1, photos); j++) {
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
        "type": TYPES[getRandomNumber(0, 3)],
        "rooms": getRandomNumber(1, 4),
        "guests": getRandomNumber(1, 3),
        "checkin": CHECKIN_PERIODS[getRandomNumber(0, 2)],
        "checkout": CHECKOUT_PERIODS[getRandomNumber(0, 2)],
        "features": FEATURES.slice(0, getRandomNumber(1, 5)),
        "description": `Строка с описанием ${i + 1}`,
        "photos": getPhotoset(),
      },
      "location": {
        "x": getRandomNumber(130, 1200),
        "y": getRandomNumber(130, 630),
      },
      "adId": {
        "id": i,
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

let renderPins = function () { // !сделать проверку на наличие пинов. сейчас дублируется
  let templatePinButton = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
  let poolPins = document.querySelector(`.map__pins`);
  let fragment = document.createDocumentFragment();

  for (let i = 0; i < 8; i++) {
    let newPin = templatePinButton.cloneNode(true);
    let avatarImg = newPin.querySelector(`img`);

    newPin.setAttribute(`data-id`, dataSource[i].adId.id);
    newPin.style.left = (dataSource[i].location.x - 20) + `px`;
    newPin.style.top = (dataSource[i].location.y - 40) + `px`;
    avatarImg.src = dataSource[i].author.avatar;
    avatarImg.alt = dataSource[i].offer.title;
    avatarImg.setAttribute(`data-id`, i);
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
  templateCardAvatar.src = dataSource[cardNumber].author.avatar;
};


let renderCard = function () {
  document.querySelector(`.map__pins`).addEventListener(`click`, function (evt) {
    if (evt.target.dataset.id >= 0) {
      let templateCard = document.querySelector(`#card`).content;
      let newCard = templateCard.cloneNode(true);
      let id = evt.target.dataset.id;

      if (document.querySelector(`.map__card`)) { // удаляем предыдущее объявление
        document.querySelector(`.map__card`).remove();
      };

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
  });
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
  currentAddress.setAttribute(`readonly`, `readonly`);
};

adFormDisable();

if (document.querySelector(`.map--faded`) !== `null`) { // !не срабатывает. просьба посмотреть почему
  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === 1) {
      adFormActicateAll();
      setCurrentAddress();
    }
  });

  mapPin.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === 13) {
      adFormActicateAll();
      setCurrentAddress();
    }
  });
}

let adFormActicateAll = function () {
  mapFaded.classList.remove(`map--faded`);
  mapAdFormDisabled.classList.remove(`ad-form--disabled`);
  renderPins();
  renderCard();
  adFormEnable();
};


/* Валидация */

/*
3.3. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»:
«Бунгало» — минимальная цена за ночь 0;
«Квартира» — минимальная цена за ночь 1 000;
«Дом» — минимальная цена 5 000;
«Дворец» — минимальная цена 10 000.
Обратите внимание: вместе с минимальным значением цены нужно изменять и плейсхолдер.
Обратите внимание: ограничение минимальной цены заключается именно в изменении минимального значения, которое можно ввести в поле с ценой, изменять само значение поля не нужно, это приведёт к плохому UX (опыту взаимодействия). Даже если текущее значение не попадает под новые ограничения не стоит без ведома пользователя изменять значение поля.
3.4. Адрес: ручное редактирование поля запрещено. Значение автоматически выставляется при перемещении метки .map__pin--main по карте. Подробности заполнения поля адреса, описаны вместе с поведением метки.
3.5. Поля «Время заезда» и «Время выезда» синхронизированы: при изменении значения одного поля, во втором выделяется соответствующее ему. Например, если время заезда указано «после 14», то время выезда будет равно «до 14» и наоборот.
3.6. Поле «Количество комнат» синхронизировано с полем «Количество мест» таким образом,
что при выборе количества комнат вводятся ограничения на допустимые варианты выбора количества
 гостей:
1 комната — «для 1 гостя»;
2 комнаты — «для 2 гостей» или «для 1 гостя»;
3 комнаты — «для 3 гостей», «для 2 гостей» или «для 1 гостя»;
100 комнат — «не для гостей».
Обратите внимание: допускаются разные способы ограничения допустимых значений
 поля «Количество мест»: удаление из разметки соответствующих элементов option,
 добавление элементам option состояния disabled или другие способы ограничения, например,
 с помощью метода setCustomValidity.
*/


let adFormElement = document.querySelector(`#adForm`);
const ROOMS_TO_GUESTS_MAP = { // !прочитать про объект map
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
    // const MIN_NAME_LENGTH = 30; // так как значения не будут меняться, можно убрать const
    // const MAX_NAME_LENGTH = 100;

    if (valueLength < 30) {
      inputTarget.setCustomValidity(`Еще ` + (30 - valueLength) + ` символов.`);
    } else if (valueLength > 100) {
      inputTarget.setCustomValidity(`Удалите лишние ` + (valueLength - 100) + ` символов.`);
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

  if (typeElement.value === `bungalow`) {
    priceElement.setAttribute(`min`, `0`);
    priceElement.setAttribute(`placeholder`, `0`);
  } else if (typeElement.value === `flat`) {
    priceElement.setAttribute(`min`, `1000`);
    priceElement.setAttribute(`placeholder`, `1000`);
  } else if (typeElement.value === `house`) {
    priceElement.setAttribute(`min`, `5000`);
    priceElement.setAttribute(`placeholder`, `5000`);
  } else if (typeElement.value === `palace`) {
    priceElement.setAttribute(`min`, `10000`);
    priceElement.setAttribute(`placeholder`, `10000`);
  }
};

let setTimeInDependencies = function (inputTarget) {
  let timeOut = document.querySelector(`#timeout`);
  if (inputTarget.value === `12:00`) {
    timeOut.value = `12:00`;
  } else if (inputTarget.value === `13:00`) {
    timeOut.value = `13:00`;
  } else if (inputTarget.value === `14:00`) {
    timeOut.value = `14:00`;
  }
};

let setTimeOutDependencies = function (inputTarget) {
  let timeIn = document.querySelector(`#timein`);
  if (inputTarget.value === `12:00`) {
    timeIn.value = `12:00`;
  } else if (inputTarget.value === `13:00`) {
    timeIn.value = `13:00`;
  } else if (inputTarget.value === `14:00`) {
    timeIn.value = `14:00`;
  }
};

let setGuestDependencies = function () {
  let roomsCount = document.querySelector(`#room_number`).value;

  Array.from(document.querySelector(`#capacity`).options).forEach(function (option) {
    if (ROOMS_TO_GUESTS_MAP[roomsCount].includes(option.value)) {
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

setTypeDependencies();
setGuestDependencies();
setAllowedFiles();

/* Открытие карточки объявления */

/*
Задача
Доработайте проект так, чтобы пользователь мог открыть карточку любого доступного объявления;
Добавьте возможность закрытия карточки с подробной информацией по нажатию клавиши Esc и клике по иконке закрытия;
Добавьте поддержку открытия карточки объявления с клавиатуры. Карточка объявления для выбранной метки открывается при нажатии на клавишу Enter.
Сделайте так, чтобы одновременно могла быть открыта только одна карточка объявления.
*/


