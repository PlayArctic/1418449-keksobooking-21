'use strict';
(function () {
  let URL = `задать`; // !задать

  let uploadData = function (data, onSuccess) { // data это то что передаем на сервер, см. ниже
    let xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, function () {
      onSuccess(xhr.response);
    });

    xhr.open(`POST`, URL);
    xhr.send(data); // отправка данных data на сервер
  };


  let sendForm = document.querySelector(`.ad-form__submit`);
  sendForm.addEventListener(`submit`, function (evt) {
    window.upload(new FormData(sendForm), function () {
      // !какая-то логика после отправки данных из ТЗ
    });
    evt.preventDefault();
  });

  window.upload = {
    uploadData
  };
})();
