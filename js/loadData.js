'use strict';

(function () {
  let URL = `https://21.javascript.pages.academy/keksobooking/data`;
  let data = [];
  let getData = function () {
    return data;
  };

  let errorCallback = function (error) {
    // eslint-disable-next-line no-console
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
      let error;
      switch (xhr.status) {
        case 200:
          data = JSON.parse(xhr.responseText);

          afterSuccsessCallback(data);
          break;

        case 400:
          error = `Неверный запрос`;
          break;
        case 401:
          error = `Пользователь не авторизован`;
          break;
        case 404:
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

    xhr.open(`GET`, URL);
    xhr.send(); // в случае если загружаем с сервера то ничего не передаем
  };

  window.loadData = {
    getServerData,
    getData
  };
})();
