'use strict';

(function () {
  /* Готовим массив данных для загрузки на сайт */

  // const AVATAR = [{ avatar: `img/avatars/user01.png` }, { avatar: `img/avatars/user02.png` }, { avatar: `img/avatars/user03.png` }, { avatar: `img/avatars/user04.png` }, { avatar: `img/avatars/user05.png` }, { avatar: `img/avatars/user06.png` }, { avatar: `img/avatars/user07.png` }, { avatar: `img/avatars/user08.png` }];
  // const TYPES = [{ type: `palace` }, { type: `flat` }, { type: `house` }, { type: `bungalow` }];
  // const CHECKIN_PERIODS = [`12:00`, `13:00`, `14:00`];
  // const CHECKOUT_PERIODS = [`12:00`, `13:00`, `14:00`];
  // const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];

  // let getRandomNumber = function (min, max) {
  //   return Math.round(((Math.random() * (max - min)) + min));
  // };

  // let getPhotoset = function (photos = 5) {
  //   let photoSet = [];
  //   for (let j = 0; j < getRandomNumber(1, photos); j++) {
  //     photoSet.push(`http://o0.github.io/assets/images/tokyo/hotel${j}.jpg`);
  //   }
  //   return photoSet;
  // };

  // let getData = function () {
  //   let adDataStorage = [];
  //   for (let i = 0; i < 8; i++) {
  //     let adData = {
  //       "author": {
  //         "avatar": AVATAR[i].avatar,
  //       },
  //       "offer": {
  //         "title": `Заголовок предложения ${i + 1}`,
  //         "address": `${getRandomNumber(0, 600)}, ${getRandomNumber(0, 350)}`,
  //         "price": `${getRandomNumber(1000, 50000)}`,
  //         "type": TYPES[getRandomNumber(0, 3)],
  //         "rooms": getRandomNumber(1, 4),
  //         "guests": getRandomNumber(1, 3),
  //         "checkin": CHECKIN_PERIODS[getRandomNumber(0, 2)],
  //         "checkout": CHECKOUT_PERIODS[getRandomNumber(0, 2)],
  //         "features": FEATURES.slice(0, getRandomNumber(1, 5)),
  //         "description": `Строка с описанием ${i + 1}`,
  //         "photos": getPhotoset(),
  //       },
  //       "location": {
  //         "x": getRandomNumber(130, 1200),
  //         "y": getRandomNumber(130, 630),
  //       },
  //       "adId": {
  //         "id": i,
  //       }
  //     };

  //     adDataStorage.push(adData);
  //   }
  //   return adDataStorage;
  // };


  // let dataSource = getData();

  // window.mock = {
  //   dataSource,

  // };
})();
