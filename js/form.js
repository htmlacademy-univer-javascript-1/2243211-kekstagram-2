import { checkStringLength } from './util.js';
import { outputData } from './api.js';
import { indError } from './error.js';
import { showSuccess } from './success.js';
import { closeUploadOverlay } from './form-picture.js';

const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_LENGTH = 5;
const REGEX = /^#[A-Za-zА-Яа-яЁё0-9]{1,19}$/;

const submitBtn = document.querySelector('#upload-submit');
const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtagsInput = imgUploadForm.querySelector('.text__hashtags');
const textDescriptionInput = imgUploadForm.querySelector('.text__description');
const uploadFormSubmitButtonElement = imgUploadForm.querySelector('.img-upload__submit');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error'
});

const validateDescription = (value) => checkStringLength(value, MAX_DESCRIPTION_LENGTH);

const validateHashtagsLength = (value) => value.split(' ').length <= MAX_HASHTAGS_LENGTH;

const validateHashtagUniqueness = (value) => {
  const hashtags = value.toLowerCase().split(' ');
  return hashtags.length === new Set(hashtags).size;
};

const validateHashtagFormat = (value) => {
  if (value === '') {
    return true;
  }
  else {
    return value.split(' ').every((hashtag) => REGEX.test(hashtag));
  }
};

export const validateForm = () => {
  const description = textDescriptionInput.value;
  const hashtags = textHashtagsInput.value;
  uploadFormSubmitButtonElement.disabled = !(validateHashtagFormat(hashtags) && validateHashtagUniqueness(hashtags) &&
    validateHashtagsLength(hashtags) && validateDescription(description));
};

pristine.addValidator(
  textDescriptionInput,
  validateDescription,
  'Длина комментария не более 140 символов'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagsLength,
  'Не более 5 ХэшТегов'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagUniqueness,
  'ХэшТеги не должны повторяться'
);

pristine.addValidator(
  textHashtagsInput,
  validateHashtagFormat,
  'Формат: #хештег, длина ХешТега не более 20 символов. Хэштеги разделены пробелами!'
);

const blockSubmitBtn = (text) => {
  submitBtn.disabled = true;
  submitBtn.textContent = text;
};

const unblockSubmitBtn = () => {
  submitBtn.disabled = false;
  submitBtn.textContent = 'Сохранить';
};


imgUploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    blockSubmitBtn('Публикую...');
    outputData(
      () => {
        closeUploadOverlay();
        showSuccess('Публикация отправлена');
        unblockSubmitBtn();
      },
      () => {
        closeUploadOverlay();
        indError('Ошибка отправки. Попробуйте позже');
        unblockSubmitBtn();
      },
      new FormData(evt.target)
    );
  } else {
    blockSubmitBtn('Неправильно заполнены поля!');
    setTimeout(unblockSubmitBtn, 3000);
  }
});
