import {RESULT} from '../constants.js';

class Result {
  template() {
    return `<div id=${RESULT.ID}></div>`;
  }
}

const result = new Result();

export default result;
