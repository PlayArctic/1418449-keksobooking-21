'use strict';

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

    let checkerCoords = function (coord, min, max) {
      coord = parseInt(coord, 10);

      if (coord > max) {
        return max;
      } else {
        if (coord < min) {
          return min;
        }

        return coord;
      }

      // return coord > max
      //   ? max
      //   : coord < min
      //     ? min
      //     : coord;
    };

    pinHandle.style.top = checkerCoords((pinHandle.offsetTop - shift.y), 130, 630) + `px`; // тк pin на абсолюте, создаем сдвиг
    pinHandle.style.left = checkerCoords((pinHandle.offsetLeft - shift.x), 0, 1130) + `px`;
    window.listeners.setCurrentAddress();
  };

  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);

    if (dragged) {
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

