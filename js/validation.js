import {checkLength} from './util.js';

const pictureForm = document.querySelector('#upload-select-image');
const hashtagInput = pictureForm.querySelector('.text__hashtags');
const commentInput = pictureForm.querySelector('.text__description');

const MAX_HASH_TAGS_COUNT = 5;
const MAX_COMMENT_LENGTH = 140;

export const pristine = new Pristine(pictureForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'img-upload__field__error'
});

function validateHashTags(hashTagString) {
  if (hashTagString.length === 0) {
    return true;
  }

  const regex = /^#[a-zA-Z0-9]{1,19}$/;

  const hashTags = hashTagString.trim().split(/\s+/);

  if (hashTags.length > MAX_HASH_TAGS_COUNT) {
    return false;
  }

  const tagSet = new Set();

  for (let hashTag of hashTags) {
    if (!regex.test(hashTag)) {
      return false;
    }

    hashTag = hashTag.toLowerCase();

    if (tagSet.has(hashTag)) {
      return false;
    }
    tagSet.add(hashTag);
  }

  return true;
}

const validateComment = (comment) => checkStringLenght(comment, MAX_COMMENT_LENGTH);

pristine.addValidator(
  hashtagInput,
  validateHashTags,
  'Максимальное допустимое кол-во хэш-тегов: 5. После знака # допустимы только буквы и цифры'
);

pristine.addValidator(
  commentInput,
  validateComment,
  'Максимальное количество символов: 140'
);

pictureForm.addEventListener('submit', (evt) => {
  if (!pristine.validate()) {
    evt.preventDefault();
  }
});
