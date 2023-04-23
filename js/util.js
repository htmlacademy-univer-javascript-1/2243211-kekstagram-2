const checkLength = (str, maxLength) => str.lenght <= maxLength;

const getRandomNumber =(min, max) => {
    if (max <= min) {
      throw new RangeError('Максимальное значение должно быть больше минимального!');
    }
    if ((min || max) < 0) {
      throw new RangeError ('Числа должны быть неотрицательными!');
    }
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  export {getRandomNumber, checkLength};