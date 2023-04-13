const checkLength = (str, maxLength) => str.lenght <= maxLength;

function getRandomInt (min, max) {
if (min < 0 || max < 0) {
    throw new RangeError("Числа в диапазоне должны быть неотрицательными.");
}

if (min > max) {
[min, max] = [max, min];
}

if (min === max) {
    return max;
}

min = Math.ceil(min);
max = Math.floor(max);

return Math.floor(Math.random() * (max - min + 1)) + min;
}; 