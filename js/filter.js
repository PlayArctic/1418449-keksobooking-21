'use strict';

(function () {
  let currentFilterType = `flat`;
  let currentFilterPrice = `middle`;
  let currentFilterRoom = `1`;
  let currentFilterGuest = `1`;
  // let filteredData = [];

  const updateData = function () {
    let data = window.loadData.getData();
    const sameTypeAds = data.filter(function (i) {
      return i.offer.type === currentFilterType;
    });

    // filteredData = sameTypeAds;
    window.pin.renderPins(sameTypeAds);
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
        currentFilterType = evt.target.value;
        break;
      case `housing-price`:
        currentFilterPrice = evt.target.value;
        break;
      case `housing-rooms`:
        currentFilterRoom = evt.target.value;
        break;
      case `housing-guests`:
        currentFilterGuest = evt.target.value;
        break;
      default:
        return;
    }

    updateData();
  });

  window.filter = {
    updateData,
  };
})();
