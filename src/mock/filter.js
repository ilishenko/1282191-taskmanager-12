import {isTaskExpired, isTaskRepeating, isTaskExpiringToday} from "../utils.js";

const taskToFilterMap = (tasks) => {

  return tasks.reduce((filter, task) => {
    const all = filter.all + !task.isArchive;
    const overdue = filter.overdue + (isTaskExpired(task.dueDate) && !task.isArchive);
    const today = filter.today + (isTaskExpiringToday(task.dueDate) && !task.isArchive);
    const favorites = filter.favorites + (task.isFavorite && !task.isArchive);
    const repeating = filter.repeating + (isTaskRepeating(task.repeating) && !task.isArchive);
    const archive = filter.archive + task.isArchive;

    return {
      all,
      overdue,
      today,
      favorites,
      repeating,
      archive,
    };
  }, {
    all: 0,
    overdue: 0,
    today: 0,
    favorites: 0,
    repeating: 0,
    archive: 0,
  });

};

export const generateFilter = (tasks) => {
  return Object.entries(taskToFilterMap(tasks)).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks,
    };
  });
};
