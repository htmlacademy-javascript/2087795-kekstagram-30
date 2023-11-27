// const COMMENTS_COUNT_SHOW = 5;

// //Переменные для открытия и закрытия попапа
// const bigPictureElement = document.querySelector('.big-picture');
// const bodyElement = document.querySelector('body');
// const closePictureButtonElement = bigPictureElement.querySelector('#picture-cancel');

// const commentsListElement = bigPictureElement.querySelector('.social__comments');
// const commentCuntElement = bigPictureElement.querySelector('.social__comment-shown-count');
// const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
// const commentsLoaderElement = bigPictureElement.querySelector('.comments-loader');

// //Находит шаблон, который мы ранее создали и в контенте шаблона находит элемент li
// const commentElement = document.querySelector('#comment').content.querySelector('.social__comment');

// let commentsCuntShown = 0;
// let comments = [];

// // Функция создает коментарий
// const createComment = ({avatar, message, name}) => {
//   //Новый комментарий равен глубокой копии элемента li из шаблона
//   const newComment = commentElement.cloneNode(true);
//   //Находим в созданном комментарии img и прописываем заполнене атрибутов
//   const socialPictureElement = newComment.querySelector('.social__picture');
//   socialPictureElement.src = avatar;
//   socialPictureElement.alt = name;
//   //Прописываем заполнение тега p
//   newComment.querySelector('.social__text').textContent = message;

//   return newComment;
// };

// //Функция отрисовывает комментарии
// const renderComments = () => {
//   commentsCuntShown += COMMENTS_COUNT_SHOW;

//   if (commentsCuntShown >= comments.length) {
//     commentsLoaderElement.classList.add('hidden');
//     commentsCuntShown = comments.length;
//   } else {
//     commentsLoaderElement.classList.remove('hidden');
//   }

//   const fragment = document.createDocumentFragment();
//   for (let i = 0; i < commentsCuntShown; i++) {
//     const comment = createComment(comments[i]);
//     fragment.append(comment);
//   }
//   commentsListElement.innerHTML = '';
//   commentsListElement.append(fragment);
//   commentCuntElement.textContent = commentsCuntShown;
//   totalCommentCountElement.textContent = comments.length;
// };

// const onCommentsLoaderClock = () => renderComments();

// const hidePicture = () => {
//   commentsCuntShown = 0;
//   bigPictureElement.classList.add('hidden');
//   bodyElement.classList.remove('modal-open');
//   document.removeEventListener('keydown', onDocumentKeydown);
// };

// const onClosePictureButtonClik = () => {
//   hidePicture();
// };

// function onDocumentKeydown(evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     hidePicture();
//   }
// }

// // Данная функция отрисовывает большое изображение в попап
// const renderPicture = ({ url, description, likes }) => {
//   const imagePictureElement = bigPictureElement.querySelector('.big-picture__img img');
//   imagePictureElement.src = url;
//   imagePictureElement.alt = description;
//   bigPictureElement.querySelector('.likes-count').textContent = likes;
//   bigPictureElement.querySelector('.social__caption').textContent = description;
// };

// // Функция открывает попап и вызывает функцию отрисовки большого изображение, а сам обработчик находится на контейнере в котором лежат все привью
// // И добавлен обработчик на весь документ для закрытия попапа с клавиатуры
// const showPicture = (pictureData) => {
//   bigPictureElement.classList.remove('hidden');
//   bodyElement.classList.add('modal-open');
//   document.addEventListener('keydown', onDocumentKeydown);

//   comments = pictureData.comments;
//   if (comments.length > 0) {
//     renderComments();
//   }

//   renderPicture(pictureData);
// };

// closePictureButtonElement.addEventListener('click', onClosePictureButtonClik);
// commentsLoaderElement.addEventListener('click', onCommentsLoaderClock);

// export { showPicture };

////


import { isEscapeKey } from './util.js';

const COMMENT_COUNT_SHOWN = 5;

const bigPictureElement = document.querySelector('.big-picture');
const bodyElement = document.querySelector('body');
const closePictureButton = bigPictureElement.querySelector('.big-picture__cancel');
const commentsListElement = bigPictureElement.querySelector('.social__comments');
const commentCountElement = bigPictureElement.querySelector('.social__comment-shown-count');
const totalCommentCountElement = bigPictureElement.querySelector('.social__comment-total-count');
const commentsLoaderElements = bigPictureElement.querySelector('.comments-loader');

const commentElement = document
  .querySelector('#comment')
  .content
  .querySelector('.social__comment');

let commentsCountShown = 0;
let comments = [];

const createComment = ({ avatar, message, name }) => {
  const newComment = commentElement.cloneNode(true);

  newComment.querySelector('.social__picture').src = avatar;
  newComment.querySelector('.social__picture').alt = name;
  newComment.querySelector('.social__text').textContent = message;

  return newComment;
};

const renderComments = () => {
  commentsCountShown += COMMENT_COUNT_SHOWN;

  if (commentsCountShown >= comments.length) {
    commentsLoaderElements.classList.add('hidden');
    commentsCountShown = comments.length;
  } else {
    commentsLoaderElements.classList.remove('hidden');
  }

  const fragment = document.createDocumentFragment();

  for (let i = 0; i < commentsCountShown; i++) {
    const comment = createComment(comments[i]);
    fragment.append(comment);
  }

  commentsListElement.innerHTML = '';

  commentsListElement.append(fragment);

  commentCountElement.textContent = commentsCountShown;
  totalCommentCountElement.textContent = comments.length;
};

const onCommentsLoaderClick = () => renderComments();

const hidePicture = () => {
  commentsCountShown = 0;
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onClosePictureButtonClick = () => {
  hidePicture();
};

function onDocumentKeydown(evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    hidePicture();
  }
}

const renderPicture = ({ url, description, likes }) => {
  bigPictureElement.querySelector('.big-picture__img img').src = url;
  bigPictureElement.querySelector('.big-picture__img img').alt = description;
  bigPictureElement.querySelector('.likes-count').textContent = likes;
  bigPictureElement.querySelector('.social__caption').textContent = description;
};

const showPicture = (pictureData) => {
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  comments = pictureData.comments;
  if (comments.length > 0){
    renderComments();
  }

  renderPicture(pictureData);
};

closePictureButton.addEventListener('click', onClosePictureButtonClick);
commentsLoaderElements.addEventListener('click', onCommentsLoaderClick);

export { showPicture };
