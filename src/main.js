import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/site-filter.js";
import {createBoardTemplate} from "./view/site-board.js";
import {createTaskTemplate} from "./view/site-task.js";
import {createTaskEditTemplate} from "./view/site-task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/site-button.js";
import {render} from "./view/site-render.js";
import {generateTask} from "./mock/task.js";
import {generateFilter} from "./mock/filter.js";

const TASK_COUNT = 22;
const TASK_COUNT_PER_STEP = 8;

const tasks = new Array(TASK_COUNT).fill().map(generateTask);
const filters = generateFilter(tasks);
const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createFilterTemplate(filters), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(taskListElement, createTaskEditTemplate(), `beforeend`);
render(taskListElement, createTaskEditTemplate(tasks[0]), `beforeend`);

for (let i = 1; i < Math.min(tasks.length, TASK_COUNT_PER_STEP); i++) {
  render(taskListElement, createTaskTemplate(tasks[i]), `beforeend`);
}

if (tasks.length > TASK_COUNT_PER_STEP) {
  let renderedTaskCount = TASK_COUNT_PER_STEP;

  render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.load-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    tasks
      .slice(renderedTaskCount, renderedTaskCount + TASK_COUNT_PER_STEP)
      .forEach((task) => render(taskListElement, createTaskTemplate(task), `beforeend`));

    renderedTaskCount += TASK_COUNT_PER_STEP;

    if (renderedTaskCount >= tasks.length) {
      loadMoreButton.remove();
    }
  });
}
