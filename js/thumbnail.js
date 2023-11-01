const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');
const container = document.querySelector('.pictures');
//Переменные для открытия и закрытия попапа
const bigPicture = document.querySelector('.big-picture');
const body = document.querySelector('body');
const commentNot = document.querySelector('.social__comment-count');
const commentLoaderNot = document.querySelector('.social__comments-loader');

const createThumbnail = ({url, description, comments, likes}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const imagePicture = thumbnail.querySelector('.picture__img');
  imagePicture.src = url;
  imagePicture.alt = description;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  //Добавила обработчик событий на клик, появляется модальное окно
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    bigPicture.classList.remove('hidden');
    body.classList.add('modal-open');
    commentNot.classList.add('hidden');
    commentLoaderNot.classList.add('hidden');
  });
  //Конец тут
  return thumbnail;
};

//Закрывает попап по кнопке
const closeBigPicture = document.querySelector('#picture-cancel');
closeBigPicture.addEventListener('click', () => {
  bigPicture.classList.add('hidden');
});

document.addEventListener('keydown', (evt) => {
  if (evt.keyCode === 27) {
    bigPicture.classList.add('hidden');
  }
});

const renderThumbnails = (pictures) => {
  const fragment = document.createDocumentFragment();
  pictures.forEach((picture) => {
    const thumbnail = createThumbnail(picture);
    fragment.append(thumbnail);
  });

  container.append(fragment);
};

export {renderThumbnails};
