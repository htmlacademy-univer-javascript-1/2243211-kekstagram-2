const checkStringLength = (str, maxLength) => (str.length <= maxLength);

const getRandomNumber = (min, max) => {
  if (max <= min) {
    throw new RangeError('Максимальное значение должно быть больше минимального!');
  }
  if ((min || max) < 0) {
    throw new RangeError('Числа должны быть неотрицательными!');
  }
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const mixArray = (array) => (array.sort(() => Math.random() - 0.5));

function getId () {
  let lastGetId = 0;

  return function () {
    lastGetId += 1;
    return lastGetId;
  };
}

function getUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example

function debounce (callback, timeoutDelay = 500) {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { getRandomNumber, checkStringLength, isEscapeKey, getId, getUniqueId, mixArray, debounce };
