import { isEscapeKey } from './util.js';
import { reloadPhotoScale } from './form-scale-picture.js';
import { reloadFilters } from './form-effects-picture.js';

const uploadPhoto = document.querySelector('#upload-file');
const uploadPhotoOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelBtn = document.querySelector('#upload-cancel');

const onuploadPhotoChange = (evt) => {
  evt.preventDefault();
  if (uploadPhoto.value) {
    openUploadOverlay();
  }
};

const onUploadPhotoEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeUploadOverlay();
  }
};

const onUploadCancelBtnClick = (evt) => {
  evt.preventDefault();
  closeUploadOverlay();
};

function openUploadOverlay() {
  uploadPhotoOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', onUploadPhotoEscKeydown);
  uploadCancelBtn.addEventListener('click', onUploadCancelBtnClick);
}

function closeUploadOverlay() {
  uploadPhotoOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', onUploadPhotoEscKeydown);
  uploadCancelBtn.removeEventListener('click', onUploadCancelBtnClick);

  uploadPhoto.value = null;
  reloadPhotoScale();
  reloadFilters();
}

uploadPhoto.addEventListener('change', onuploadPhotoChange);

export { openUploadOverlay, closeUploadOverlay };
