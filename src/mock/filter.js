import {isTaskExpired, isTaskRepeating, isTaskExpiringToday} from "../utils.js";

const taskToFilterMap = (tasks) => {
  tasks.reduce((filter, task) => {
    const all = filter.all + !task.isArchive;
    const overdue = filter.overdue + !task.isArchive + isTaskExpired(task.dueDate);
    const today = filter.today + !task.isArchive + isTaskExpiringToday(task.dueDate);
    const favorites = filter.favorites + !task.isArchive + task.isFavorite;
    const repeating = filter.repeating + !task.isArchive + isTaskRepeating(task.repeating);
    const archive = filter.archive + task.isArchive;

    return {
      all,
      overdue,
      today,
      favorites,
      repeating,
      archive,
    };
  });
  return tasks.reduce;
};

export const generateFilter = (tasks) => {
  return Object.entries(taskToFilterMap).map(([filterName, countTasks]) => {
    return {
      name: filterName,
      count: countTasks(tasks),
    };
  });
};
