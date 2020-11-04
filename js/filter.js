'use strict';

const DEFAULT_FILTER_VALUE = `any`;

const filters = {
  'housing-type': DEFAULT_FILTER_VALUE,
  'housing-price': DEFAULT_FILTER_VALUE,
  'housing-rooms': DEFAULT_FILTER_VALUE,
  'housing-guests': DEFAULT_FILTER_VALUE,
  'features': {
    'filter-wifi': {key: `wifi`, value: false},
    'filter-dishwasher': {key: `dishwasher`, value: false},
    'filter-parking': {key: `parking`, value: false},
    'filter-washer': {key: `washer`, value: false},
    'filter-elevator': {key: `elevator`, value: false},
    'filter-conditioner': {key: `conditioner`, value: false},
  },
};

let priceMap = {
  low: {min: 0, max: 10000},
  middle: {min: 9999, max: 50001},
  high: {min: 50000, max: 1000000},
};
let filteredAds;

let getFilteredAds = function () {
  return filteredAds;
};

let checkFeature = function (item) {
  for (let featureKey in filters.features) {
    if (filters.features[featureKey].value
      && !item.offer.features.includes(filters.features[featureKey].key)
    ) {
      return false;
    }
  }

  return true;
};

let filterPrice = function (item) {
  return filters[`housing-price`] === DEFAULT_FILTER_VALUE
    || item.offer.price > priceMap[filters[`housing-price`]].min && item.offer.price < priceMap[filters[`housing-price`]].max;
};

let filterType = function (item) {
  return filters[`housing-type`] === DEFAULT_FILTER_VALUE || filters[`housing-type`] === item.offer.type;
};

let filterRooms = function (item) {
  return filters[`housing-rooms`] === DEFAULT_FILTER_VALUE || parseInt(filters[`housing-rooms`], 10) === item.offer.rooms;
};

let filterGuests = function (item) {
  return filters[`housing-guests`] === DEFAULT_FILTER_VALUE || parseInt(filters[`housing-guests`], 10) === item.offer.guests;
};

const updateData = function () {
  filteredAds = window.request.getData().filter(function (item) {
    return filterPrice(item) && filterType(item) && filterRooms(item) && filterGuests(item) && checkFeature(item);
  });

  window.pin.renderPins(filteredAds);
};


let setFilterChangeCather = function () {
  document.querySelector(`.map__filters`).addEventListener(`change`, function (evt) {
    document.querySelectorAll(`button[data-id]`).forEach(function (pin) {
      pin.remove();
    });

    if (document.querySelector(`.map__card`)) {
      document.querySelector(`.map__card`).remove();
    }

    if (evt.target.id in filters) {
      filters[evt.target.id] = evt.target.value;
    } else if (evt.target.id in filters.features) {
      filters.features[evt.target.id].value = !filters.features[evt.target.id].value;
    }

    window.debounce.fixDebounce(updateData);
  });
};

setFilterChangeCather();

window.filter = {
  updateData,
  getFilteredAds,
};
