import { getPhotos } from './data.js';
import { renderThumbnails } from './thumbnail.js';

const pictures = getPhotos();

renderThumbnails(pictures);
