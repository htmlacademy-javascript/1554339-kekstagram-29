const DESCRIPTION = [
  'Зимой как-то холодно',
  'Летом жарко!',
  'Люблю поесть',
  'Больше лайков!',
  'Мне нужен чай',
  'Всех с окончанием рабочей недели:)',
  'Когда скучно',
  'Скоро увидимся',
];
const NAMES = [
  'Валентина',
  'Мария',
  'Ольга',
  'Сетлана',
  'Игорь',
  'Олег',
  'Ирина',
  'Татьяна',
  'Александр',
  'Дмитрий',
];
const MESSAGE = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const NEW_OBJECTS_COUNT = 25;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const createRandomId = (min, max) => {
  const previousValues = [];

  return function () {
    let currentValue = getRandomInteger(min, max);
    if (previousValues.length >= (max - min + 1)) {
      console.error('Перебраны все числа из диапазона от ' + min + ' до ' + max);
      return null;
    }
    while (previousValues.includes(currentValue)) {
      currentValue = getRandomInteger(min, max);
    }
    previousValues.push(currentValue);
    return currentValue;
  };
};

const randomIdComment = createRandomId(100, 500); //вместо 63 строки

const createComment = () => {
  // const randomIdComment = createRandomId(100, 500);
  const randomAvatar = getRandomInteger(1, 6);

  return {
    id: randomIdComment(),
    avatar: 'img/avatar-' + randomAvatar + '.svg',
    message: getRandomArrayElement(MESSAGE),
    name: getRandomArrayElement(NAMES),
  };
};

const randomId = createRandomId(1, 25); //вместо 78 строки

const createObject = () => {

  // const randomId = createRandomId(1, 25);
  const id = randomId();

  return {
    // id: randomId(),
    // url: 'photos/' + randomId() + '.jpg',
    id: id,
    url: 'photos/' + id + '.jpg',
    description: getRandomArrayElement(DESCRIPTION),
    like: getRandomInteger(15, 200),
    comment: Array.from({length: getRandomInteger(0, 30)}, createComment),
  };
};

const newObjects = Array.from({length: NEW_OBJECTS_COUNT}, createObject);

console.log(newObjects);
