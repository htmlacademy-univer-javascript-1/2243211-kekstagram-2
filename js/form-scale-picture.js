const PHOTO_SCALE_STEP = 25;
const PHOTO_SCALE_DEFAULT = 100;

const scaleValue = document.querySelector('.scale__control--value');
const scaleSmallerBtn = document.querySelector('.scale__control--smaller');
const scaleBiggerBtn = document.querySelector('.scale__control--bigger');
const previewPhoto = document.querySelector('.img-upload__preview');

let photoScaleValue = PHOTO_SCALE_DEFAULT;

const setScale = () => (previewPhoto.style['transform'] = `scale(${photoScaleValue / 100})`);

const onScaleSmallerClick = () => {
  if (photoScaleValue === 25) {
    return;
  }

  photoScaleValue = photoScaleValue - PHOTO_SCALE_STEP;
  scaleValue.value = `${photoScaleValue}%`;
  setScale();
};

const onScaleBiggerClick = () => {
  if (photoScaleValue === 100) {
    return;
  }

  photoScaleValue = photoScaleValue + PHOTO_SCALE_STEP;
  scaleValue.value = `${photoScaleValue}%`;
  setScale();
};

const reloadPhotoScale = () => {
  photoScaleValue = PHOTO_SCALE_DEFAULT;
  scaleValue.value = `${photoScaleValue}%`;
  setScale();
};

scaleSmallerBtn.addEventListener('click', onScaleSmallerClick);
scaleBiggerBtn.addEventListener('click', onScaleBiggerClick);

export { reloadPhotoScale };
