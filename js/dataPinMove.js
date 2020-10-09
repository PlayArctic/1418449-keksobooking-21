'use strict';

(function () {

  let pinHandle = document.querySelector(`.map__pin--main`);

  pinHandle.addEventListener(`mousedown`, function (evt) {

    let startCoords = {
      x: evt.clientX, // положение мыши на экране
      y: evt.clientY
    };

    let dragged = false; // флаг для отлова движения

    let onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      dragged = true;

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = { // цепочка обсластей видимости. записываем в родительский startCoords
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + `px`; // тк pin на абсолюте, создаем сдвиг
      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + `px`;
      window.dataListeners.setCurrentAddress();
    };

    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) { // в проекте не нужно. оставил для понимания логики
        let onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          pinHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        pinHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };


    document.addEventListener(`mousemove`, onMouseMove); // именно на document. так как движение и отжатие отслеживаем на всей странице
    document.addEventListener(`mouseup`, onMouseUp);
  });

})();
