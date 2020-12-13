import subwayStore from "../models/SubwayStore.js";

class LineManager {
  constructor({ $target }) {
    this.$target = $target;

    this.mountDOMs();
    this.bindEvents();
    this.render();

    console.log(this);
  }

  mountDOMs() {
    this.$input = this.$target.querySelector(`#line-name-input`);
    this.$startSelect = this.$target.querySelector(
      `#line-start-station-selector`,
    );
    this.$endSelect = this.$target.querySelector(`#line-end-station-selector`);
    this.$addButton = this.$target.querySelector(`#line-add-button`);
    this.$table = this.$target.querySelector(`#line-table`);
  }

  bindEvents() {
    this.$addButton.addEventListener(`click`, this.onClickAddButton.bind(this));
    this.$table.addEventListener(`click`, this.onClickDeleteButton.bind(this));
    this.$startSelect.addEventListener(
      `change`,
      this.onChangeStartSelect.bind(this),
    );
    this.$endSelect.addEventListener(
      `change`,
      this.onChangeEndSelect.bind(this),
    );
  }

  onClickAddButton({ target }) {}

  onClickDeleteButton({ target }) {}

  onChangeStartSelect({ target }) {}

  onChangeEndSelect({ target }) {}

  render() {}
}

export default LineManager;

/*
지하철 노선의 이름을 입력하는 input 태그는 #line-name-input id값을 가진다.
지하철 노선의 상행 종점을 선택하는 select 태그는 #line-start-station-selector id값을 가진다.
지하철 노선의 하행 종점을 선택하는 select 태그는 #line-end-station-selector id값을 가진다.
지하철 노선을 추가하는 button 태그는 #line-add-button id값을 가진다.
지하철 노선을 삭제하는 button 태그는 .line-delete-button class값을 가진다.
*/
