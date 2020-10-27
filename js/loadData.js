'use strict';

let URL_LOAD_ADDRES = `https://21.javascript.pages.academy/keksobooking/data`;
let data = [];
let getData = function () {
  return data;
};

let errorCallback = function (error) {
  let node = document.createElement(`div`);
  node.style = `border-radius: 0 0 5px 5px; z-index: 100; margin: 0 auto; text-align: center; background-color: orange;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `24px`;
  node.style.fontFamily = `Roboto`;

  node.textContent = error;
  document.body.insertAdjacentElement(`afterbegin`, node);
};


let getServerData = function (afterSuccsessCallback) {
  let xhr = new XMLHttpRequest();

  xhr.addEventListener(`load`, function () {
    const SUCCESS_CODE = 200;
    const WRONG_REQUEST_CODE = 400;
    const NOT_AUTHORIZED_CODE = 401;
    const NOT_FOUND_CODE = 404;
    let error;

    switch (xhr.status) {
      case SUCCESS_CODE:
        data = JSON.parse(xhr.responseText);
        afterSuccsessCallback(data);
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

  xhr.timeout = 10000;

  xhr.open(`GET`, URL_LOAD_ADDRES);
  xhr.send(); // в случае если загружаем с сервера то ничего не передаем
};

window.loadData = {
  getServerData,
  getData
};
