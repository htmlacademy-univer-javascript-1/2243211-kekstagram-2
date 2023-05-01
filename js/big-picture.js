import { createPhotoDescription } from './data.js';
import { isEscapeKey } from './util.js';

const bigPicture = document.querySelector('.big-picture');
const closeButton = bigPicture.querySelector('#picture-cancel');
const commentsList = document.querySelector('.social__comments');

const AVATAR_IMAGE_SIZE = 35;

const generateAvatar = (avatarUrl, userName) => {
  const avatarImage = document.createElement('img');
  avatarImage.classList.add('social__picture');
  avatarImage.src = avatarUrl;
  avatarImage.alt = userName;

  avatarImage.width = AVATAR_IMAGE_SIZE;
  avatarImage.height = AVATAR_IMAGE_SIZE;

  return avatarImage;
};

const generateCommentText = (textMessage) => {
  const commentText = document.createElement('p');
  commentText.classList.add('social__text');
  commentText.textContent = textMessage;

  return commentText;
};

const createComments = ({avatar, name, message}) => {
  const commentItem = document.createElement('li');
  commentItem.classList.add('social__comment');
  commentItem.appendChild(generateAvatar(avatar, name));
  commentItem.appendChild(generateCommentText(message));

  return commentItem;
};

const clearCommentsList = () => {
  commentsList.innerHTML = '';
};

const onBigPictureEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const createBigPicture = ({url, likes, description, comments}) => {
  bigPicture.querySelector('.big-picture__img img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  const commentFragment = document.createDocumentFragment();
  for (const comment of comments) {
    commentFragment.appendChild(createComments(comment));
  }

  bigPicture.querySelector('.social__comments').replaceChildren(commentFragment);
  bigPicture.querySelector('.social__caption').textContent = description;
};

const changeToBigPicture = (evt) => {
  if (evt.target.value) {
    showBigPhoto();
  }
};

const showBigPhoto = () => {
  if (document.body.classList.contains('modal-open')) {
    return;
  }

  createBigPicture(createPhotoDescription());

  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');

  bigPicture.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onBigPictureEscKeydown);
  closeButton.addEventListener('click', changeToBigPicture);
};

const cancelBigPhoto = () => closeBigPicture();

const closeBigPicture = () => {
  if (!document.body.classList.contains('modal-open')) {
    return;
  }

  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onBigPictureEscKeydown);
  closeButton.removeEventListener('click', cancelBigPhoto);

  bigPicture.value = null;
  clearCommentsList();
};

bigPicture.addEventListener('change', changeToBigPicture);

const escapePressed = (evt) => evt.key === 'Escape' && closeBigPicture();
document.addEventListener('keydown',(evt) => escapePressed(evt));
closeButton.addEventListener('click', closeBigPicture);

export { showBigPhoto };