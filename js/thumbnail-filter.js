import { debounce, mixArray } from './util.js';
import { showPhoto, hidePhoto } from './rend-picture.js';

const RERENDER_DELAY = 500;

const Filters = {
  default: 'filter-default',
  random: 'filter-random',
  mostCommented: 'filter-discussed'
};

const photoFilters = document.querySelector('.img-filters');

let actualFilter = Filters.default;
let defaultPhotoFiltered = [];

const matchComments = (pictureA, pictureB) => pictureB.comments.length - pictureA.comments.length;

const showFilters = (pictures) => {
  photoFilters.classList.remove('img-filters--inactive');
  defaultPhotoFiltered = pictures;
};

const onFiltersFormClick = function (evt) {
  const changePhotos = (cb) => {
    cb();
  };

  if (evt.target.nodeName === 'BUTTON') {
    evt.preventDefault();

    if (actualFilter !== evt.target.id) {
      photoFilters.querySelector(`#${actualFilter}`).classList.remove('img-filters__button--active');
      photoFilters.querySelector(`#${evt.target.id}`).classList.add('img-filters__button--active');
      actualFilter = evt.target.id;

      switch (actualFilter) {
        case Filters.default:
          changePhotos(debounce(() => {
            hidePhoto();
            showPhoto(defaultPhotoFiltered);
          }, RERENDER_DELAY));
          break;
        case Filters.random:
          changePhotos(debounce(() => {
            hidePhoto();
            showPhoto(mixArray(defaultPhotoFiltered.slice()).slice(15));
          }, RERENDER_DELAY));
          break;
        case Filters.mostCommented:
          changePhotos(debounce(() => {
            hidePhoto();
            showPhoto(mixArray(defaultPhotoFiltered.slice()).sort(matchComments));
          }, RERENDER_DELAY));
          break;
        default:
          changePhotos(debounce(() => {
            hidePhoto();
            showPhoto(mixArray(defaultPhotoFiltered));
          }, RERENDER_DELAY));
      }
    }
  }
};

photoFilters.addEventListener('click', onFiltersFormClick);

export { showFilters };
