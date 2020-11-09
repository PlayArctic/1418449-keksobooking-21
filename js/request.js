/* eslint-disable object-shorthand */
'use strict';

let URL_LOAD_ADDRESS = `https://21.javascript.pages.academy/keksobooking/data`;
let URL_UPLOAD_ADDRESS = `https://21.javascript.pages.academy/keksobooking`;

let data = [];

let getData = function () {
  return data;
};

let sendRequest = function (url, body, onSuccessCallback, onErrorCallback) {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, function () {
    const SUCCESS_CODE = 200;
    const WRONG_REQUEST_CODE = 400;
    const NOT_AUTHORIZED_CODE = 401;
    const NOT_FOUND_CODE = 404;
    let error;

    switch (xhr.status) {
      case SUCCESS_CODE:
        let response = xhr.response;

        if (Array.isArray(response)) {
          data = response.filter((item) => item.offer);
        }

        onSuccessCallback(data);
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
      onErrorCallback(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    onErrorCallback(`Произошла ошибка соединения`);
  });

  xhr.addEventListener(`timeout`, function () {
    onErrorCallback(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = 10000;

  xhr.open(body ? `POST` : `GET`, url);
  xhr.send(body);
};

window.request = {
  URL_LOAD_ADDRESS,
  URL_UPLOAD_ADDRESS,
  getData,
  sendRequest,
};
