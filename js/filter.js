'use strict';

(function () {
  let filterType = document.querySelector(`#housing-type`);
  let currentFilterType = `flat`;

  const updateData = function () {
    let data = window.loadData.getData();
    const sameTypeAds = data.filter(function (i) {
      return i.offer.type === currentFilterType;
    });

    window.pin.renderPins(sameTypeAds); // .concat(data)
  };


  filterType.addEventListener(`change`, function () {
    document.querySelectorAll(`button[data-id]`).forEach(function (pin) { // элементы button которые содержат атрибут data-id
      pin.remove();
    });

    if (document.querySelector(`.map__card`)) {
      document.querySelector(`.map__card`).remove();
    }

    currentFilterType = filterType.value;

    updateData();
  });

  window.filter = {
    updateData,
  };

})();


// let filterPrice = document.querySelector(`#housing-price`);
// let filterRoom = document.querySelector(`#housing-rooms`);
// let filterGuest = document.querySelector(`#housing-guests`);
// let unFilteredData = window.loadData.getData();
