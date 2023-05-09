import { getRandomNumber, getId, getUniqueId } from './util.js';

const getPhotoId = getId();
const getPostId = getId();

const MIN_LIKES = 15;
const MAX_LIKES = 200;
const PHOTO_OBJECTS_COUNT = 25;

const DESCRIPTION = [
  'Работаем',
  'Отдыхаем',
  'Кушаем',
  'Спим',
  'Делайте в вашей жизни то, что меньше заставляет вас смотреть в свой телефон',
  'Улыбка — единственный тренд в моде, который актуален всегда',
  'Никогда не ищите свое счастье там, где вы его однажды потеряли',
  'Жизнь похожа на фотокамеру: вам просто нужно смотреть на нее с улыбкой',
  'Моя жизнь меняется, потому что меняю ее я'
];

const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
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


function createComment() {
  return {
    id: getUniqueId(),
    avatar: `img/avatar-${getRandomNumber(1, 6)}.svg`,
    name: NAMES[getRandomNumber(0, NAMES.length - 1)],
    message: MESSAGE[getRandomNumber(0, MESSAGE.length - 1)],
  };
}

function createPost() {
  return {
    id: getPostId(),
    url: `photos/${getPhotoId()}.jpg`,
    likes: getRandomNumber(MIN_LIKES, MAX_LIKES),
    description: DESCRIPTION[getRandomNumber(0, DESCRIPTION.length - 1)],
    comments: Array.from({ length: getRandomNumber(0, 24) }, createComment)
  };

}
// eslint-disable-next-line eol-last
const pictures = Array.from({ length: PHOTO_OBJECTS_COUNT }, createPost);

export { pictures };
