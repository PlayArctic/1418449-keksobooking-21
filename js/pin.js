'use strict';

(function () {

  /* Отрисовываем Pins */

  let renderPins = function (data) {
    let templatePinButton = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    let poolPins = document.querySelector(`.map__pins`);
    let fragment = document.createDocumentFragment();

    for (let i = 0; i < data.length; i++) {
      let newPin = templatePinButton.cloneNode(true);
      let avatarImg = newPin.querySelector(`img`);

      newPin.setAttribute(`data-id`, i);
      newPin.style.left = (data[i].location.x - 20) + `px`;
      newPin.style.top = (data[i].location.y - 40) + `px`;
      avatarImg.src = data[i].author.avatar;
      avatarImg.alt = data[i].offer.title;
      avatarImg.setAttribute(`data-id`, i);
      fragment.appendChild(newPin);
    }

    return poolPins.appendChild(fragment);
  };

  window.pin = {
    renderPins,
  };

})();
