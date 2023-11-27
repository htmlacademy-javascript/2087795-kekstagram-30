//Функция генерации случайных числел в заданном диапозоне с двумя параметрами где (а) минимальное число, а (b) максимальное число
// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// export {getRandomInteger};

//////

// const isEscapeKey = (evt) => evt.key === 'Escape';

// const errorMessageTemplate = document
//   .querySelector('#data-error')
//   .content
//   .querySelector('.data-error');

// const REMOVE_MESSAGE_TIMEOUT = 5000;

// const showErrorMessage = () => {
//   const errorElement = errorMessageTemplate.cloneNode(true);
//   document.body.append(errorElement);

//   setTimeout(() => {
//     errorElement.remove();
//   }, REMOVE_MESSAGE_TIMEOUT);
// };

// const debounce = (callback, timeoutDelay = 500) => {
//   let timeoutId;
//   return (...rest) => {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
//   };
// };

// export { isEscapeKey, showErrorMessage, debounce };

/////

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
  // Используем замыкания, чтобы id таймаута у нас навсегда приклеился
  // к возвращаемой функции с setTimeout, тогда мы его сможем перезаписывать
  let timeoutId;

  return (...rest) => {
    // Перед каждым новым вызовом удаляем предыдущий таймаут,
    // чтобы они не накапливались
    clearTimeout(timeoutId);

    // Затем устанавливаем новый таймаут с вызовом колбэка на ту же задержку
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);

    // Таким образом цикл «поставить таймаут - удалить таймаут» будет выполняться,
    // пока действие совершается чаще, чем переданная задержка timeoutDelay
  };
}

export { isEscapeKey, showErrorMessage, debounce };
