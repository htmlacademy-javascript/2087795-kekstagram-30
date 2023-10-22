//Функция генерации случайных числел в заданном диапозоне с двумя параметрами где (а) минимальное число, а (b) максимальное число
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

export {getRandomInteger};
