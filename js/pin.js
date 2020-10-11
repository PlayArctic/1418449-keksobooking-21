'use strict';

(function () {

  /* Отрисовываем Pins */

  let renderPins = function () {
    let templatePinButton = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let poolPins = document.querySelector(`.map__pins`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < 8; i++) {
      let newPin = templatePinButton.cloneNode(true);
      let avatarImg = newPin.querySelector(`img`);

      newPin.setAttribute(`data-id`, window.dataService.dataSource[i].adId.id);
      newPin.style.left = (window.dataService.dataSource[i].location.x - 20) + `px`;
      newPin.style.top = (window.dataService.dataSource[i].location.y - 40) + `px`;
      avatarImg.src = window.dataService.dataSource[i].author.avatar;
      avatarImg.alt = window.dataService.dataSource[i].offer.title;
      avatarImg.setAttribute(`data-id`, i);
      fragment.appendChild(newPin);
    }

    return poolPins.appendChild(fragment);
  };

  window.dataPins = {
    renderPins,
  };

})();
