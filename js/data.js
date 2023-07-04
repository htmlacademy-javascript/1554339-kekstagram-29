import {getRandomInteger, getRandomArrayElement, createRandomId} from './util.js';

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

const OBJECTS_COUNT = 25;
const COMMENTS_COUNT = 30;

const LIKES = {
  min: 15,
  max: 200,
};

const createMessage = () => {
  const messageCount = getRandomInteger(1, 2);
  const message = [];

  for (let i = 1; i <= messageCount; i++) {
    message.push(getRandomArrayElement(MESSAGE));
  }

  return message.join(' ');
};

const createComment = (generateRandomCommentId) => {
  const randomAvatar = getRandomInteger(1, 6);

  return {
    id: generateRandomCommentId(),
    avatar: `img/avatar-${randomAvatar}.svg`,
    message: createMessage(),
    name: getRandomArrayElement(NAMES),
  };
};

const createObject = (generateRandomId) => {
  const id = generateRandomId();
  const generateRandomCommentId = createRandomId(1, OBJECTS_COUNT);
  const comments = [];

  for (let i = 0; i < getRandomInteger(0, COMMENTS_COUNT); i++) {
    comments.push(createComment(generateRandomCommentId));
  }

  return {
    id: id,
    url: `photos/${id}.jpg`,
    description: getRandomArrayElement(DESCRIPTION),
    like: getRandomInteger(LIKES.min, LIKES.max),
    comment: comments,
  };
};

const createAllObjects = () => {
  const generateRandomId = createRandomId(1, OBJECTS_COUNT);
  const newObjects = [];

  for (let i = 0; i < OBJECTS_COUNT; i++) {
    newObjects.push(createObject(generateRandomId));
  }

  return newObjects;
};

export {createAllObjects};
