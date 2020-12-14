import Component from '../factory/Component.js';
import Line from '../factory/Line.js';
import { LINE } from '../share/selector.js';
import { checkOverlap, checkSameStation } from '../share/utils.js';
import { lineTableTemplate, optionTemplate } from '../share/template.js';

export default class LineManager extends Component {
  constructor(props) {
    super(props);

    this.state.lineList = [];

    this.form = this.container.querySelector(`#${LINE.LINE_FORM_ID}`);
    this.userInput = this.container.querySelector(
      `#${LINE.LINE_NAME_INPUT_ID}`,
    );
    this.startStationSelector = this.container.querySelector(
      `#${LINE.LINE_START_STATION_SELECTOR_ID}`,
    );
    this.endStationSelector = this.container.querySelector(
      `#${LINE.LINE_END_STATION_SELECTOR}`,
    );
    this.addBtn = this.container.querySelector(`#${LINE.LINE_ADD_BUTTON_ID}`);
    this.table = this.container.querySelector(`#${LINE.LINE_TABLE_BODY}`);

    this.form.addEventListener('submit', this.onSubmit);
    this.table.addEventListener('click', this.onTableClick);
  }

  updateStationList() {
    this.startStationSelector.innerHTML = this.state.stationList
      .map((station) => optionTemplate(station))
      .join('');
    this.endStationSelector.innerHTML = this.state.stationList
      .map((station) => optionTemplate(station))
      .join('');
  }

  onSubmit = (event) => {
    event.preventDefault();
    const constructorObj = this.getValues();
    const newLine = new Line(constructorObj);
    this.addLineToList(newLine);
  };

  onTableClick = (event) => {
    const { className } = event.target;
    const { index } = event.target.dataset;
    if (className !== LINE.LINE_DELETE_BUTTON_CLASS) return;
    this.deleteLineFromList(index);
  };

  addLineToList(line) {
    if (!this.checkValidity(line)) return;
    const newLineList = [...this.state.lineList];
    newLineList.push(line);
    this.setState({
      lineList: newLineList,
    });
  }

  deleteLineFromList(index) {
    const newLineList = [...this.state.lineList];
    newLineList.splice(index, 1);
    this.setState({
      lineList: newLineList,
    });
    this.props.syncData(this.state);
  }

  checkValidity = ({ name, startStation, endStation }) =>
    checkOverlap(name, this.getAllLineNames()) &&
    checkSameStation(startStation, endStation);

  getAllLineNames = () => this.state.lineList.map((line) => line.name);

  getValues = () => {
    const { value: name } = this.userInput;
    const { value: startStation } = this.startStationSelector;
    const { value: endStation } = this.endStationSelector;
    return { name, startStation, endStation };
  };

  template() {
    return this.state.lineList
      .map((line, index) =>
        lineTableTemplate({
          ...line,
          index,
          buttonClass: LINE.LINE_DELETE_BUTTON_CLASS,
        }),
      )
      .join('');
  }

  setState(nextData) {
    this.state = {
      ...this.state,
      ...nextData,
    };
    this.updateStationList();
    this.render();
  }

  render() {
    this.table.innerHTML = this.template();
  }
}
