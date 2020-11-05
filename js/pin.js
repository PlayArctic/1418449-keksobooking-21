'use strict';

let renderPins = function (data) {
  let fragment = document.createDocumentFragment();
  let maxAdQuantity = Math.min(data.length, 5);

  for (let pinNum = 0; pinNum < maxAdQuantity; pinNum++) {
    let newPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
    let avatarImg = newPin.querySelector(`img`);

    newPin.style.left = (data[pinNum].location.x - 20) + `px`;
    newPin.style.top = (data[pinNum].location.y - 40) + `px`;
    newPin.dataset.id = pinNum;

    avatarImg.src = data[pinNum].author.avatar;
    avatarImg.alt = data[pinNum].offer.title;
    avatarImg.dataset.id = pinNum;

    fragment.appendChild(newPin);
  }

  return document.querySelector(`.map__pins`).appendChild(fragment);
};

window.pin = {
  renderPins,
};

