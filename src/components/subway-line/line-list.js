import {LINE} from '../../constants.js';

class LineList {
  template(line, i) {
    return `
      <tr>
        <td>${line.name}</td>
        <td>${line.start}</td>
        <td>${line.end}</td>
        <td>
          <button data-line-id=${i} class=${LINE.BUTTON.DELETE.CLASS}>삭제
          </button>
        </td>
      </tr>
    `;
  }
}

const lineList = new LineList();

export default lineList;
