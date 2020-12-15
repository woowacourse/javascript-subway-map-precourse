import {
  addEventToCreateLineBtn,
  addEventToDeleteBtn,
} from '../util/events.js';

export default class Line {
  constructor() {
    addEventToCreateLineBtn();
    addEventToDeleteBtn('#line-list');
  }
}
