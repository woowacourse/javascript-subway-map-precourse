import Component from '../factory/Component.js';
import { LINE } from '../share/selector.js';

export default class LineManager extends Component {
  constructor(props) {
    super(props);

    this.form = document.querySelector(`#${LINE.LINE_FORM_ID}`);
    this.form.addEventListener('submit', this.handleSubmit);
  }

  handleSubmit=(e) => {
    e.preventDefault();
    console.log(this.state);
  }
}
