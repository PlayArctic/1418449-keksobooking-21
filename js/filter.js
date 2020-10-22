'use strict';

let DEFAULT_FILTER_VALUE = `any`;
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

let getFilteredAds = function () { // !без ф-ции window.filter.filteredAds возвращает пустой объект
  return filteredAds;
};

let featureChecker = function (item) {
  for (let featureKey in filters.features) {
    if (filters.features[featureKey] && !item.offer.features.includes(featureKey)) { // если значение true но его нет в features item'a то сразу false
      return false;
    }
  }

  return true;
};

// let priceMap = {
//   low: {min: `< 0`, max: `< 10000`},
//   middle: {min: `>= 10000`, max: `<= 50000`},
//   high: {min: `> 50000`, max: `< 1000000`},
// };

// let filterPrice = function (item) {
//   for (let priceLevel in priceMap) {
//     if (item.offer.price > priceLevel.min && item.offer.price < priceLevel.min) {
//       return true;
//     }
//   }

//   return false;
// };

let filterPrice = function (item) {
  let textPrice;
  if (item.offer.price < 10000) {
    textPrice = `low`;
  } else if (item.offer.price > 10000 && item.offer.price < 50000) {
    textPrice = `middle`;
  } else if (item.offer.price > 50000) {
    textPrice = `high`;
  }

  return filters.price === DEFAULT_FILTER_VALUE || filters.price === textPrice;
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
  filteredAds = window.loadData.getData().filter(function (item) {
    // фильтр возвращает новый массив return которых будет true
    return filterPrice(item) && filterType(item) && filterRooms(item) && filterGuests(item) && featureChecker(item);
  });
  window.pin.renderPins(filteredAds);
};

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
    case `filter-wifi`:
      if (!filters.features.wifi) {
        filters.features.wifi = true;
      } else {
        filters.features.wifi = false;
      }
      break;
    case `filter-dishwasher`:
      if (filters.features.dishwasher === false) {
        filters.features.dishwasher = true;
      } else {
        filters.features.dishwasher = false;
      }
      break;
    case `filter-parking`:
      if (filters.features.parking === false) {
        filters.features.parking = true;
      } else {
        filters.features.parking = false;
      }
      break;
    case `filter-washer`:
      if (filters.features.washer === false) {
        filters.features.washer = true;
      } else {
        filters.features.washer = false;
      }
      break;
    case `filter-elevator`:
      if (filters.features.elevator === false) {
        filters.features.elevator = true;
      } else {
        filters.features.elevator = false;
      }
      break;
    case `filter-conditioner`:
      if (filters.features.conditioner === false) {
        filters.features.conditioner = true;
      } else {
        filters.features.conditioner = false;
      }
      break;
  }

  updateData();
});

window.filter = {
  updateData,
  getFilteredAds,
};
