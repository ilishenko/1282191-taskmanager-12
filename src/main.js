const TASK_COUNT = 3;

import {createSiteMenuTemplate} from "./view/site-menu.js";
import {createFilterTemplate} from "./view/site-filter.js";
import {createBoardTemplate} from "./view/site-board.js";
import {createTaskTemplate} from "./view/site-task.js";
import {createTaskEditTemplate} from "./view/site-task-edit.js";
import {createLoadMoreButtonTemplate} from "./view/site-button.js";
import {render} from "./view/site-render.js";

const siteMainElement = document.querySelector(`.main`);
const siteHeaderElement = siteMainElement.querySelector(`.main__control`);

render(siteHeaderElement, createSiteMenuTemplate(), `beforeend`);

render(siteMainElement, createFilterTemplate(), `beforeend`);
render(siteMainElement, createBoardTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.board`);
const taskListElement = boardElement.querySelector(`.board__tasks`);

render(taskListElement, createTaskEditTemplate(), `beforeend`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createTaskTemplate(), `beforeend`);
}

render(boardElement, createLoadMoreButtonTemplate(), `beforeend`);
