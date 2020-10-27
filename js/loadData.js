'use strict';

let data = [];
let getData = function () {
  return data;
};

let errorCallback = function (errorMessage) {
  let node = document.createElement(`div`);
  node.style = `border-radius: 0 0 5px 5px; z-index: 100; margin: 0 auto; text-align: center; background-color: orange;`;
  node.style.position = `absolute`;
  node.style.left = 0;
  node.style.right = 0;
  node.style.fontSize = `24px`;
  node.style.fontFamily = `Roboto`;
  node.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, node);
};

let getServerData = function (afterSuccsessCallback) {
  let URL_LOAD_ADDRES = `https://21.javascript.pages.academy/keksobooking/data`;
  const WRONG_REQUEST_CODE = 400;
  const NOT_AUTHORIZED_CODE = 401;
  const NOT_FOUND_CODE = 404;
  let error;

  return fetch(URL_LOAD_ADDRES).
  then(function (response) {
    if (response.status >= 400) {
      switch (response.status) {
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
          error = `Cтатус ответа: : ` + response.status + ` ` + response.statusText;
      }

      return errorCallback(error);
    }

    return response.json().then(function (clientData) {
      data = clientData;
      afterSuccsessCallback(clientData);
    });
  });
};

window.loadData = {
  getServerData,
  getData
};
