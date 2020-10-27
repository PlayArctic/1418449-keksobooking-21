/* eslint-disable indent */
'use strict';
// !fetch возвращает promise
let URL_LOAD_ADDRES = `https://jsonplaceholder.typicode.com/users`;

// let getServerDataFetch = function (url) {
//   return fetch(url).then((response) => { // ответ в формате ReadableStream
//     return response.json(); // приводит ответ к json; response.text() к тексту
//   });
// };

// getServerDataFetch(`GET`, URL_LOAD_ADDRES)
// .then((data) => console.log(data))
// .catch((error) => console.log(error));

// !

let data = {
  name: `Vlad`,
  age: 92
};

let sendServerDataFetch = function (url) {
  const WRONG_REQUEST_CODE = 400;
  const NOT_AUTHORIZED_CODE = 401;
  const NOT_FOUND_CODE = 404;
  let error;

  const HEADERS = {
    'Content-Type': `application/json`,
  };

  return fetch(url, {
    method: `GET`,
    headers: HEADERS
  }).then((response) => {
    // if (response.status >= 400) {

    //   switch (response.status) {
    //   case WRONG_REQUEST_CODE:
    //     error = `Неверный запрос`;
    //     break;
    //   case NOT_AUTHORIZED_CODE:
    //     error = `Пользователь не авторизован`;
    //     break;
    //   case NOT_FOUND_CODE:
    //     error = `Ничего не найдено`;
    //     break;

    //   default:
    //     error = `Cтатус ответа: : ` + response.status + ` ` + response.statusText;
    //   }

    //   return console.log(error);
    // }

    return response.json().then((response) =>
    console.log(response));

  });
};

sendServerDataFetch(URL_LOAD_ADDRES);

