import Menu from './menu.js';
import Register from './register.js';
import Result from './result.js';

class Frame {
  template() {
    return `
      ${Menu.template()}<br>${Register.template()}${Result.template()}
    `;
  }
}

const frame = new Frame();

export default frame;
