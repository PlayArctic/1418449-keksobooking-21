'use strict';

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
