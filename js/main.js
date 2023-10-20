const COUNT_OBJECTS = 25; //Для массива из 25 сгенерированных объектов
const LikeCount = {
  MIN: 15,
  MAX: 200
};
const COUNT_COMMENTS = 30; // Максимальное кол-во комментариев под фотографией опубликованной пользователем
const COUNT_AVATAR = 6; // Пользователей аватаров и имен

const NAMES = [
  'Гарик',
  'Филиппо',
  'Клавдия',
  'Петричео',
  'Педро',
  'Аннабель',
  'Дюймовочка',
  'Красная шапочка',
  'Страшило',
  'Лимпопон',
  'Гризли',
  'Золушка'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра.',
  'В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают.',
  'Как можно было поймать такой неудачный момент?!'
];

const DESCRIPTION = [
  'Моя бабуля курит трубку...',
  'Какая она милашка, ей уже 6 лет',
  'Огонь! Мы хорошо отдохнули',
  'И что это было? Нафига он прыгал с горы, полюбуйтесь на него',
  'Наша собака колли, лучшая стойка...',
  'Вообще то это не правильо, так нельзя! Я специально на фото это показываю. Делайте правильно)'
];

//Функция генерации случайных числел в заданном диапозоне с двумя параметрами где (а) минимальное число, а (b) максимальное число
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

// Создаем функцию для получения 1 комментария состоящего из 1 или 2 предложений, предложения выбираем из массива в случайном порядке, повторений быть не должно
const createComment = () => {
  const countComment = getRandomInteger(1, 2); // Рандомно создаем число от 1 до 2, используем функцию
  const textComment = []; // Создаем пустой массив
  for (let i = 0; i < countComment; i++) { // Создаем цикл с счетчиком из ранее полученных рандомных чисел
    const comment = COMMENTS[getRandomInteger(0, COMMENTS.length - 1)]; // Получаем рандомный комментарий из задонного массива
    if (textComment.includes(comment)) { // Проверяем есть ли полученный комментарий в новом массиве с помощью метода includes
      i -= 1; // Если комментарий существует в массиве, уменьшаем счетчик цикла на 1 и запускаем цикл заново
      continue; // запуск цикла заново
    }
    textComment.push(comment); // добавляем уникальный коммент в массив
  }
  return textComment.join(' '); // возвращаем массив преобразованный в строку
};

const createIdGenerator = () => {
  let lastGeneratedId = 0;

  return () => {
    lastGeneratedId += 1;
    return lastGeneratedId;
  };
};

const getIdComment = createIdGenerator();

const createComments = () => ({
  name: NAMES[getRandomInteger(0, NAMES.length - 1)],
  avatar: `img/avatar-${getRandomInteger(1, COUNT_AVATAR)}.svg`,
  id: getIdComment(),
  message: createComment()
});

const getComments = () => {
  const arr = [];
  for (let i = 0; i < getRandomInteger(1, COUNT_COMMENTS); i++) {
    arr.push(createComments());
  }
  return arr;
};

const getIdPhoto = createIdGenerator();
const id = getIdPhoto();

const createPhoto = () => ({
  id: id,
  url: `photos/${id}.jpg`, // путь адрес картинки вида photos/{{i}}.jpg, где {{i}} — это число от 1 до 25. Адреса картинок не должны повторяться.
  description: DESCRIPTION[getRandomInteger(0, DESCRIPTION.length - 1)],
  likes: getRandomInteger(LikeCount.MIN, LikeCount.MAX), // 15 - 200
  comments: getComments() // количество комментариев к каждой фотографии от 1 до 30
});

const getPhotos = () => {
  const photos = [];
  for (let i = 0; i < COUNT_OBJECTS; i++) {
    photos.push(createPhoto());
  }
  return photos;
};
