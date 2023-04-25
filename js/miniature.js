import {createObjects} from './data.js';

const miniatureListElement = document.querySelector('.picture');
const miniatureTemplate = document.querySelector('#picture').content;
const miniatureObjects = createObjects ();
const miniatureListFragment = document.createDocumentFragment();

miniatureObjects.forEach(({url, likes, comments}) => {
  const miniatureElement = miniatureTemplate.cloneNode(true);
  miniatureElement.querySelector('.picture__img').src = url;
  miniatureElement.querySelector('.picture__comments').textContent = comments;
  miniatureElement.querySelector('.picture__likes').textContent = likes;
  miniatureListFragment.appendChild(miniatureElement);
});

miniatureListElement.appendChild(miniatureListFragment);