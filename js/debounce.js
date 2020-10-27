'use strict';

const DEBOUNCE_INTERVAL = 900; // ms

let lastTimeout;
let debounceFix = function (cb) {
//  debugger;
  if (lastTimeout) {
    window.clearTimeout(lastTimeout); // пока не выполнено это действия все остальные действия будут откидываться (п2)
  }
  lastTimeout = window.setTimeout(cb, DEBOUNCE_INTERVAL); // метод setTimeout возвращает id установленного таймера (п1)

};

window.debounce = {
  debounceFix,
};
