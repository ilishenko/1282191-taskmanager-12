import {COLORS} from "../const.js";
import {getRandomInteger} from "../utils.js";
import {getBoolean} from "../utils.js";
import {arrayRandElement} from "../utils.js";

const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const MAX_DAYS_GAP = 7;

const generateDescription = () => {
  const randomIndex = getRandomInteger(0, DESCRIPTIONS.length - 1);

  return DESCRIPTIONS[randomIndex];
};

const generateDate = () => {
  const isDate = Boolean(getRandomInteger(0, 1));

  if (!isDate) {
    return null;
  }

  const daysGap = getRandomInteger(-MAX_DAYS_GAP, MAX_DAYS_GAP);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRepeating = () => {
  return {
    mo: false,
    tu: false,
    we: getBoolean(),
    th: false,
    fr: getBoolean(),
    sa: false,
    su: false
  };
};

export const generateTask = () => {
  const dueDate = generateDate();
  const repeating = dueDate === null
    ? generateRepeating()
    : {
      mo: false,
      tu: false,
      we: false,
      th: false,
      fr: false,
      sa: false,
      su: false
    };

  return {
    description: generateDescription(),
    dueDate,
    repeating,
    color: arrayRandElement(COLORS),
    isArchive: Boolean(getRandomInteger(0, 1)),
    isFavorite: Boolean(getRandomInteger(0, 1))
  };
};
