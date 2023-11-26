//Функция генерации случайных числел в заданном диапозоне с двумя параметрами где (а) минимальное число, а (b) максимальное число
// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// export {getRandomInteger};

const isEscapeKey = (evt) => evt.key === 'Escape';

const errorMessageTemplate = document
  .querySelector('#data-error')
  .content
  .querySelector('.data-error');

const REMOVE_MESSAGE_TIMEOUT = 5000;

const showErrorMessage = () => {
  const errorElement = errorMessageTemplate.cloneNode(true);
  document.body.append(errorElement);

  setTimeout(() => {
    errorElement.remove();
  }, REMOVE_MESSAGE_TIMEOUT);
};

function debounce (callback, timeoutDelay = 500) {
  // замыкания для id таймаута к возвращаемой функции с setTimeout для перезаписи
  let timeoutId;

  return (...rest) => {
    // Перед новым вызовом удаляем предыдущий таймаут,
    clearTimeout(timeoutId);

    // Устанавливаем новый таймаут с вызовом колбэка на задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export { isEscapeKey, showErrorMessage, debounce };
