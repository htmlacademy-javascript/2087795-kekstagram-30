import { resetScale } from './scale.js';
import { init as initEffect, reset as resetEffect } from './effect.js';
import { sendPicture } from './api.js';
import { showErrorMessage, showSuccessMessage } from './message.js';

const MAX_HASHTAG_COUNT = 5;
const VALID_SYMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;
const ErrorText = {
  INVALID_COUNT: `Максимум ${MAX_HASHTAG_COUNT} хештегов`,
  NOT_UNIQUE: 'Хештеги должны быть уникальными',
  INVALID_PATTERN:'Неправильный хэштег',
};

const SubmitButtonCaption = {
  SUBMITTING: 'Отправляю...',
  IDLE: 'Опубликовать',
};
const FILE_TYPES = ['png', 'jpeg', 'jpg'];

const bodyElement = document.querySelector('body');
const uploadFormElement = document.querySelector('.img-upload__form');
const overlayElement = uploadFormElement.querySelector('.img-upload__overlay');
const cancelButtonElement = uploadFormElement.querySelector('.img-upload__cancel');
const fileFiledElement = uploadFormElement.querySelector('.img-upload__input');
const hashtagFiledElement = uploadFormElement.querySelector('.text__hashtags');
const commentFiledElement = uploadFormElement.querySelector('.text__description');
const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
const photoPreviewElement = uploadFormElement.querySelector('.img-upload__preview img');
const effectsPreviewsElement = uploadFormElement.querySelectorAll('.effects__preview');

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled ? SubmitButtonCaption.SUBMITTING : SubmitButtonCaption.IDLE;
};

const pristine = new window.Pristine(uploadFormElement, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
});

const showModal = () => {
  overlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);
};

const hideModal = () => {
  uploadFormElement.reset();
  resetScale();
  resetEffect();
  pristine.reset();
  overlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
};

const isTextFieldFocused = () => document.activeElement === hashtagFiledElement || document.activeElement === commentFiledElement;

const normalizeTags = (tagString) => tagString
  .trim()
  .split(' ')
  .filter((tag) => Boolean(tag.length));

const isValidType = (file) => {
  const fileName = file.name.toLowerCase();
  return FILE_TYPES.some((it) => fileName.endsWith(it));
};

const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

const hasValidCount = (value) => normalizeTags(value).length <= MAX_HASHTAG_COUNT;

const hasUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const isErrorMessageExists = () => Boolean(document.querySelector('.error'));

function onDocumentKeydown (evt) {
  if(evt.key === 'Escape' && !isTextFieldFocused() && !isErrorMessageExists()){
    evt.preventDefault();
    hideModal();
  }
}

const onCancelButtonClick = () => {
  hideModal();
};

const onFileInputChange = () =>{
  const file = fileFiledElement.files[0];
  if(file && isValidType(file)){
    photoPreviewElement.src = URL.createObjectURL(file);
    effectsPreviewsElement.forEach((preview) => {
      preview.style.backgroundImage = `url('${photoPreviewElement.src}')`;
    });
  }
  showModal();
};

const sendForm = async(formElement) =>{
  if(!pristine.validate()){
    return;
  }
  try{
    toggleSubmitButton(true);
    await sendPicture(new FormData(formElement));
    toggleSubmitButton(false);
    hideModal();
    showSuccessMessage();

  } catch{
    showErrorMessage();
    toggleSubmitButton(false);
  }
};

const onFormSubmit = (evt) => {
  evt.preventDefault();
  sendForm(evt.target);
};

pristine.addValidator(
  hashtagFiledElement,
  hasValidCount,
  ErrorText.INVALID_COUNT,
  3,
  true
);
pristine.addValidator(
  hashtagFiledElement,
  hasUniqueTags,
  ErrorText.NOT_UNIQUE,
  2,
  true
);
pristine.addValidator(
  hashtagFiledElement,
  hasValidTags,
  ErrorText.INVALID_PATTERN,
  1,
  true
);

const initUploadPhoto = () => {
  fileFiledElement.addEventListener('change', onFileInputChange);
  cancelButtonElement.addEventListener('click', onCancelButtonClick);
  uploadFormElement.addEventListener('submit', onFormSubmit);
  initEffect();
};

export { initUploadPhoto };

/////////

// import { isEscapeKey } from './util.js';
// import {
//   init as initEffect,
//   reset as resetEffect
// } from './effect.js';
// import { resetScale } from './scale.js';
// import { sendPicture } from './api.js';
// import { showErrorMessage, showSuccessMessage } from './message.js';

// const VALID_SYMBOLS = /^#[a-zа-я0-9]{1,19}$/i;
// const FILE_TYPES = ['jpg', 'png', 'jpeg'];
// const MAX_HASHTAG_NUMBER = 5;
// const ErrorMessage = {
//   INVALID_COUNT_TAGS: `Максимум ${MAX_HASHTAG_NUMBER} хэштегов`,
//   NOT_UNIQUE_TAGS: 'Хэш-теги повторяются',
//   INVALID_TAGS: 'Неправильный хэш-тег',
// };

// const SubmitButtonCaption = {
//   SUBMITTING: 'Отправляю...',
//   IDLE: 'Опубликовано',
// };

// const bodyElement = document.querySelector('body');
// const uploadFormElement = document.querySelector('.img-upload__form');
// const uploadOverlayElement = uploadFormElement.querySelector('.img-upload__overlay');
// const closeUploadImageButton = uploadFormElement.querySelector('.img-upload__cancel');
// const inputElement = uploadFormElement.querySelector('.img-upload__input');
// const hashtagFieldElement = uploadFormElement.querySelector('.text__hashtags');
// const commentFieldElement = uploadFormElement.querySelector('.text__description');
// const submitButtonElement = uploadFormElement.querySelector('.img-upload__submit');
// const photoPreview = uploadFormElement.querySelector('.img-upload__preview img');
// const effectPreviews = uploadFormElement.querySelectorAll('.effects__preview');


// const toggleSubmitButton = (isDisabled) => {
//   submitButtonElement.disabled = isDisabled;
//   submitButtonElement.textContent = isDisabled
//     ? SubmitButtonCaption.SUBMITTING
//     : SubmitButtonCaption.IDLE;
// };

// const pristine = new window.Pristine(uploadFormElement, {
//   classTo: 'img-upload__field-wrapper',
//   errorTextParent: 'img-upload__field-wrapper',
//   errorTextClass:'img-upload__field-wrapper--error',
// });

// const openPictureForm = () => {
//   uploadOverlayElement.classList.remove('hidden');
//   bodyElement.classList.add('modal-open');
//   document.addEventListener('keydown', onDocumentKeydown);
// };

// const closePictureForm = () => {
//   resetEffect();
//   resetScale();
//   uploadFormElement.reset();
//   pristine.reset();
//   uploadOverlayElement.classList.add('hidden');
//   bodyElement.classList.remove('modal-open');
//   document.removeEventListener('keydown', onDocumentKeydown);
// };

// const isValidType = (file) => {
//   const fileName = file.name.toLowerCase();
//   return FILE_TYPES.some((it) => fileName.endsWith(it));
// };

// const onFileInputChange = () => {
//   const file = inputElement.files[0];

//   if (file && isValidType(file)) {
//     photoPreview.src = URL.createObjectURL(file);
//     effectPreviews.forEach((preview) => {
//       preview.style.backgroundImage = `url('${photoPreview.src}')`;
//     });
//   }
//   openPictureForm();
// };

// const onCloseUploadImageButtonClick = () => {
//   closePictureForm();
// };

// const isTextFieldFocus = () =>
//   document.activeElement === hashtagFieldElement ||
//   document.activeElement === commentFieldElement;

// const errorMessageExists = () => Boolean(document.querySelector('.error'));


// function onDocumentKeydown(evt) {
//   if (isEscapeKey(evt) && !isTextFieldFocus() && !errorMessageExists()) {
//     evt.preventDefault();
//     closePictureForm();
//   }
// }

// //Приводим теги к нормальному виду
// const normalizeTags = (tagString) => tagString
//   .trim() //Обрезание пустых краев
//   .split(' ') //Разделить пробелом, получаем массив тегов
//   .filter((tag) => Boolean(tag.length)); //Выводим, если не пустой

// //Задаем валидные хэштеги
// const hasValidTags = (value) => normalizeTags(value).every((tag) => VALID_SYMBOLS.test(tag));

// //Максимальное число хэштегов
// const hasValidNumber = (value) => normalizeTags(value).length <= MAX_HASHTAG_NUMBER;

// //проверяем уникальность хэштега
// const hasUniqueTags = (value) => {
//   const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase()); //теги к одному регистру
//   return lowerCaseTags.length === new Set(lowerCaseTags).size;
// };

// const sendForm = async (formElement) => {
//   if (!pristine.validate()) {
//     return;
//   }

//   try {
//     toggleSubmitButton(true);
//     await sendPicture(new FormData(formElement));
//     toggleSubmitButton(false);
//     closePictureForm();
//     showSuccessMessage();
//   } catch {
//     toggleSubmitButton(false);
//     showErrorMessage();
//   }
// };

// const onFormSubmit = async (evt) => {
//   evt.preventDefault();
//   sendForm(evt.target);
// };

// //Валидаторы
// pristine.addValidator(
//   hashtagFieldElement,
//   hasValidNumber,
//   ErrorMessage.INVALID_COUNT_TAGS,
//   3,
//   true
// );

// pristine.addValidator(
//   hashtagFieldElement,
//   hasValidTags,
//   ErrorMessage.INVALID_TAGS,
//   2,
//   true
// );

// pristine.addValidator(
//   hashtagFieldElement,
//   hasUniqueTags,
//   ErrorMessage.NOT_UNIQUE_TAGS,
//   1,
//   true
// );

// const initUploadPhoto = () => {
//   inputElement.addEventListener('change', onFileInputChange);
//   closeUploadImageButton.addEventListener('click', onCloseUploadImageButtonClick);
//   uploadFormElement.addEventListener('submit', onFormSubmit);
//   initEffect();
// };

// export { initUploadPhoto };
