'use strict';
(function () {
  let URL = `https://21.javascript.pages.academy/keksobooking`;

  let uploadData = function (data) { // data это то что передаем на сервер, см. ниже
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`; // !зачем это тут

    xhr.addEventListener(`load`, function () {
      const SUCCESS_CODE = 200;
      const WRONG_REQUEST_CODE = 400;
      const NOT_AUTHORIZED_CODE = 401;
      const NOT_FOUND_CODE = 404;
      let error;

      switch (xhr.status) {
        case SUCCESS_CODE:
          onSuccessSendCallback();
          break;
        case WRONG_REQUEST_CODE:
          error = `Неверный запрос`;
          break;
        case NOT_AUTHORIZED_CODE:
          error = `Пользователь не авторизован`;
          break;
        case NOT_FOUND_CODE:
          error = `Ничего не найдено`;
          break;
        default:
          error = `Cтатус ответа: : ` + xhr.status + ` ` + xhr.statusText;
      }

      if (error) {
        errorCallback(error);
      }
    });

    xhr.addEventListener(`error`, function () {
      errorCallback(`Произошла ошибка соединения`);
    });

    xhr.addEventListener(`timeout`, function () {
      errorCallback(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
    });

    xhr.timeout = 1;

    xhr.open(`POST`, URL);
    xhr.send(data); // отправка данных data на сервер
  };

  let onSuccessSendCallback = function () {
    let node = document.querySelector(`#success`).content;
    let newNode = node.cloneNode(true).querySelector(`.success`); // без повторного поиска внутри клонноды .querySelector(`.success`)не добавляется элемент в body
    newNode.classList.add(`overlay`);
    document.body.insertAdjacentElement(`afterbegin`, newNode);

    document.querySelector(`.overlay`).addEventListener(`click`, function () {
      this.remove(); // работает, но линтеру не нравится
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.code === `Escape`) {
        document.querySelector(`.overlay`).remove();
      }
    });
  };

  let errorCallback = function (error) { // !выделить в функцию
    // eslint-disable-next-line no-console
    let node = document.querySelector(`#error`).content;
    let newNode = node.cloneNode(true);

    newNode.querySelector(`.error`).classList.add(`overlay`);
    newNode.querySelector(`.error__message`).textContent = error;
    document.body.appendChild(newNode); // document.body.insertAdjacentElement(`afterbegin`, newNode); не сработало

    document.querySelector(`.overlay`).addEventListener(`click`, function () {
      this.remove(); // !работает, но линтеру не нравится
    });

    document.addEventListener(`keydown`, function (evt) {
      if (evt.code === `Escape` && document.querySelector(`.overlay`)) {
        document.querySelector(`.overlay`).remove();
      }
    });

    document.querySelector(`.error__button`).addEventListener(`click`, function (evt) {
      if (evt.code === `Escape`) {
        document.querySelector(`.overlay`).remove();
      }
    });
  };


  let form = document.querySelector(`#adForm`);
  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    uploadData((new FormData(form)));
  });

  window.upload = {
    uploadData
  };
})();
