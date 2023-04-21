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

  const DESCRIPTION = [
    'Работаем',
    'Отдыхаем',
    'Кушаем',
    'Спим'
  ];
  
  const MESSAGE = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  
  ];
  
  const NAMES = [
    'Женя',
    'Сережа',
    'Паша',
    'Саша',
    'Таня',
    'Коля',
    'Алиса'
  ];
  
  
  function createComment()  {
    return {
      id:getRandomNumber(1, 125),
      avatar:`img/avatar-${getRandomNumber(1, 6)}.svg`,
      name: NAMES[getRandomNumber(0, NAMES.length-1)],
      message:MESSAGE[getRandomNumber(0, MESSAGE.length-1)],
    };
  }
  
  const listComment = Array.from({length: getRandomNumber(1, 5)},createComment);
  
  function createObject() {
    return {
      id: getRandomNumber(1, 25),
      url: `photos/${getRandomNumber(1, 25)}.jpg`,
      likes: getRandomNumber(15, 200),
      description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
      comments: listComment,
    };
  
  }