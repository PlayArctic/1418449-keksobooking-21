'use strict';

let onSuccessSendCallback = function () {
  let node = document.querySelector(`#success`).content;
  let newNode = node.cloneNode(true).querySelector(`.success`); // без повторного поиска внутри клонноды .querySelector(`.success`)не добавляется элемент в body

  newNode.classList.add(`overlay`);

  document.body.appendChild(newNode);

  let overlay = document.querySelector(`.overlay`);

  overlay.addEventListener(`click`, window.handlers.setOverlayHandler);
  document.addEventListener(`keydown`, window.handlers.overlayCloseHandlerEsc);
};


let onErrorSendCallback = function (error) {
  let node = document.querySelector(`#error`).content;
  let newNode = node.cloneNode(true);

  newNode.querySelector(`.error`).classList.add(`overlay`);
  newNode.querySelector(`.error__message`).textContent = error;

  document.body.appendChild(newNode);

  let overlay = document.querySelector(`.overlay`);
  let errorButton = document.querySelector(`.error__button`);

  overlay.addEventListener(`click`, window.handlers.setOverlayHandler);
  document.addEventListener(`keydown`, window.handlers.overlayCloseHandlerEsc);

  errorButton.addEventListener(`keydown`, function (evt) {
    if (evt.code === `Escape` || evt.which === 1) {
      errorButton.remove();
    }
  });

};

let onErrorReceiveCallback = function (errorMessage) {
  let node = document.createElement(`div`);

  node.style = `border-radius: 0 0 5px 5px; z-index: 100; margin: 0 auto; text-align: center; background-color: orange;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `24px`;
  node.style.fontFamily = `Roboto`;
  node.textContent = errorMessage;

  document.body.appendChild(node);
};

window.service = {
  onSuccessSendCallback,
  onErrorSendCallback,
  onErrorReceiveCallback,
};
