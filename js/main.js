import { showPhoto } from './rend-picture.js';
import './form-picture.js';
import './form.js';
import { inputData } from './api.js';
import { indError } from './error.js';
import { showFilters } from './thumbnail-filter.js';
import './download.js';

inputData((pictures) => {
  showPhoto(pictures);
  showFilters(pictures);
}, indError);
