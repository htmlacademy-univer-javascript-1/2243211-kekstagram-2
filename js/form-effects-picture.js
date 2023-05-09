const DEFAULT_FILTER_VALUE = 100;
const Filters = {
  none: {
    effect: '',
    minValue: 0,
    maxValue: 100,
    step: 1,
    filter: '',
    measurement: '',
    hideFilter: true
  },
  chrome: {
    effect: 'chrome',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'grayscale',
    measurement: '',
    hideFilter: false
  },
  sepia: {
    effect: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: 0.1,
    filter: 'sepia',
    measurement: '',
    hideFilter: false
  },
  marvin: {
    effect: 'marvin',
    minValue: 0,
    maxValue: 100,
    step: 1,
    filter: 'invert',
    measurement: '%',
    hideFilter: false
  },
  phobos: {
    effect: 'phobos',
    minValue: 0,
    maxValue: 3,
    step: 0.1,
    filter: 'blur',
    measurement: 'px',
    hideFilter: false
  },
  heat: {
    effect: 'heat',
    minValue: 1,
    maxValue: 3,
    step: 0.1,
    filter: 'brightness',
    measurement: '',
    hideFilter: false
  }
};

const previewPhoto = document.querySelector('.img-upload__preview');
const effectLevelValue = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectsRadioElement = document.querySelector('.img-upload__effects');

let actualFilter = Filters.none;
let actualFilterClass = '';
let actualFilterValue = DEFAULT_FILTER_VALUE;

sliderElement.classList.add('visually-hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

const changeFilter = (effect) => {
  if (actualFilterClass !== '') {
    previewPhoto.classList.remove(actualFilterClass);
  }

  actualFilter = effect;
  actualFilterValue = effect.maxValue;

  if (effect.effect !== '') {
    actualFilterClass = `effects__preview--${effect.effect}`;
    previewPhoto.classList.add(actualFilterClass);
  }

  if (effect.filter !== Filters.none.filter) {
    previewPhoto.style['filter'] = `${effect.filter}(${effect.maxValue}${effect.measurement})`;
  }
  else {
    previewPhoto.style['filter'] = '';
  }

  effectLevelValue.value = actualFilterValue;

  if (effect.hideFilter) {
    sliderElement.classList.add('visually-hidden');
  } else {
    sliderElement.classList.remove('visually-hidden');
  }

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.minValue,
      max: effect.maxValue
    },
    start: effect.maxValue,
    step: effect.step
  });
};

const changeFilterValue = (value) => {
  actualFilterValue = value;
  previewPhoto.style['filter'] = `${actualFilter.filter}(${value}${actualFilter.measurement})`;
};

const onEffectsRadioChange = (evt) => {
  const value = evt.target.value;
  changeFilter(Filters[value]);
};

const reloadRadiosValue = () => {
  const filterRadios = effectsRadioElement.querySelectorAll('.effects__radio');
  filterRadios.forEach((element) => {
    element.checked = false;
  });
  filterRadios[0].checked = true;
};

const reloadFilters = () => {
  changeFilter(Filters.none);
  reloadRadiosValue();
};

effectsRadioElement.addEventListener('change', onEffectsRadioChange);

sliderElement.noUiSlider.on('update', () => {
  const sliderValue = sliderElement.noUiSlider.get();
  effectLevelValue.value = sliderValue;
  changeFilterValue(sliderValue);
});

export { reloadFilters };
