import { renderGallery } from './gallery.js';
import { initUploadPhoto } from './form.js';
import { loadPictures } from './api.js';
import { showErrorMessage } from './util.js';
import { initFilters } from './filters.js';

const bootstrap = async() => {
  try {
    const pictures = await loadPictures();
    renderGallery(pictures);
    initFilters(pictures);
  } catch(error){
    showErrorMessage();
  }
};

bootstrap();
initUploadPhoto();
/////

// import { renderGallery } from './gallery.js';
// import { initUploadPhoto } from './form.js';
// import { loadPictures } from './api.js';
// import { showErrorMessage } from './util.js';
// import { initFilters } from './filters.js';

// const bootstrap = async() => {
//   try {
//     const pictures = await loadPictures();
//     renderGallery(pictures);
//     initFilters(pictures);
//   } catch(error){
//     showErrorMessage();
//   }
// };

// bootstrap();
// initUploadPhoto();
