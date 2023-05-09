import { isEscapeKey } from './util.js';
import { showAllComments, clearAllComments } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const cancelBigPicture = document.querySelector('.big-picture__cancel');

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onClosePictureClick = (evt) => {
  evt.preventDefault();
  closeBigPicture();
};

const openBigPicture = (photo) => {
  const pictureElement = bigPicture.querySelector('.big-picture__img').lastElementChild;

  pictureElement.src = photo.url;
  pictureElement.setAttribute('alt', 'Фото пользователя');
  bigPicture.querySelector('.social__caption').textContent = photo.description;
  bigPicture.querySelector('.likes-count').textContent = photo.likes;

  cancelBigPicture.addEventListener('click', onClosePictureClick);
  document.addEventListener('keydown', onBigPictureEscKeydown);

  showAllComments(photo.comments);
  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

function closeBigPicture() {
  document.body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');
  clearAllComments();

  cancelBigPicture.removeEventListener('click', onClosePictureClick);
  document.removeEventListener('keydown', onBigPictureEscKeydown);
}

export { openBigPicture, closeBigPicture };
