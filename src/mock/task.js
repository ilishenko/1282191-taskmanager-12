import {COLORS} from "../const.js";
import {getRandomInteger} from "../utils.js";
import {getBoolean} from "../utils.js";
import {getRandomElement} from "../utils.js";

const DESCRIPTIONS = [
  `Изучить теорию`,
  `Сделать домашку`,
  `Пройти интенсив на соточку`
];

const MAX_DAYS_GAP = 7;

const generateDate = () => {
  const isDate = getBoolean();

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
    description: getRandomElement(DESCRIPTIONS),
    dueDate,
    repeating,
    color: getRandomElement(COLORS),
    isArchive: getBoolean(),
    isFavorite: getBoolean(),
  };
};
