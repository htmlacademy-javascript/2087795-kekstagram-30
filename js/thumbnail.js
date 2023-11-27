// const thumbnailTemplate = document
//   .querySelector('#picture')
//   .content.querySelector('.picture');

// const createThumbnail = ({url, description, comments, likes, id}) => {
//   const thumbnail = thumbnailTemplate.cloneNode(true);
//   const imagePicture = thumbnail.querySelector('.picture__img');
//   imagePicture.src = url;
//   imagePicture.alt = description;
//   thumbnail.querySelector('.picture__comments').textContent = comments.length;
//   thumbnail.querySelector('.picture__likes').textContent = likes;
//   thumbnail.dataset.thumbnailId = id;
//   return thumbnail;
// };

// const renderThumbnails = (pictures, container) => {
//   const fragment = document.createDocumentFragment();
//   pictures.forEach((picture) => {
//     const thumbnail = createThumbnail(picture);
//     fragment.append(thumbnail);
//   });

//   container.append(fragment);
// };

// export {renderThumbnails};
////


const thumbnailTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const createThumbnail = ({ comments, description, likes, url, id }) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  thumbnail.querySelector('.picture__img').src = url;
  //Адрес изображения url подставьте как атрибут src изображения.
  //Описание изображения description подставьте в атрибут alt изображения.
  thumbnail.querySelector('.picture__img').alt = description;
  //Количество лайков likes выведите в блок .picture__likes.
  thumbnail.querySelector('.picture__likes').textContent = likes;
  //Количество комментариев comments выведите в блок .picture__comments.
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  //добавление дата атрибута
  thumbnail.dataset.thumbnailId = id;

  return thumbnail;
};

const renderThumbnails = (pictures, container) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });
  container.append(fragment);
};

export { renderThumbnails };
