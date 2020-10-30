'use strict';

const DEBOUNCE_INTERVAL = 300; // ms

let lastTimeout;
let fixDebounce = function (cb) {
//  debugger;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout); // пока не выполнено это действия все остальные действия будут откидываться (п2)
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL); // метод setTimeout возвращает id установленного таймера (п1)

};

window.debounce = {
  fixDebounce,
};
