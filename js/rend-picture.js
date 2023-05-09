import { openBigPicture } from './big-picture.js';

const photoContainer = document.querySelector('.pictures');
const photoListFragment = document.createDocumentFragment();
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

let pictures = [];

const showPhoto = (photos) => {
  pictures = photos;
  photos.forEach(({ url, comments, likes }, index) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').setAttribute('photo-index', index);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    photoListFragment.appendChild(photoElement);
  });

  photoContainer.appendChild(photoListFragment);
};

const hidePhoto = () => {
  photoContainer.querySelectorAll('.picture').forEach((photoElement) => {
    photoElement.remove();
  });
};

const onPhotoListClick = function (evt) {
  if (evt.target.nodeName === 'IMG') {
    evt.preventDefault();
    openBigPicture(pictures[evt.target.getAttribute('photo-index')]);
  }
};

photoContainer.addEventListener('click', onPhotoListClick);

export { showPhoto, hidePhoto };
