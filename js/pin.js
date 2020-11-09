'use strict';

const MAX_AD_QTY = 5;
const PIN_SHIWT_WIDTH = 20;
const PIN_SHIWT_HEIGHT = 40;

let renderPins = function (data) {
  let fragment = document.createDocumentFragment();
  let maxAdQuantity = Math.min(data.length, MAX_AD_QTY);

  for (let pinNum = 0; pinNum < maxAdQuantity; pinNum++) {
    let newPin = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
    let avatarImg = newPin.querySelector(`img`);

    newPin.style.left = (data[pinNum].location.x - PIN_SHIWT_WIDTH) + `px`;
    newPin.style.top = (data[pinNum].location.y - PIN_SHIWT_HEIGHT) + `px`;
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

