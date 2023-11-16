import { getPhotos } from './data.js';
import { renderGallery } from './gallery.js';
import { initUploaderPhoto } from './form.js';

renderGallery(getPhotos());
initUploaderPhoto();
