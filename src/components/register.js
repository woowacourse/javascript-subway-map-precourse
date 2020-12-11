import {REGISTER} from '../constants.js';

class Register {
  template() {
    return `<div id=${REGISTER.ID}></div>`;
  }
}

const register = new Register();

export default register;
