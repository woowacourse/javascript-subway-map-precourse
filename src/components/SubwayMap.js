export default function SubwayMap({ id, $target, isShow, lines }) {
  this.$container = document.createElement("div");
  this.$container.className = "map";
  $target.append(this.$container);

  this.id = id;
  this.isShow = isShow;
  this.lines = lines;

  this.setState = ({ nextIsShow, nextLines }) => {
    this.isShow = nextIsShow;
    this.lines = nextLines;

    this.render();
  };

  this.createStationListInLine = (stations) => {
    return `<ol>${stations.map((station) => `<li>${station}</li>`).join("")}</ol>`;
  };

  this.render = () => {
    this.$container.innerHTML = this.isShow
      ? `<ul>
          ${this.lines
            .map((line) => `<li><h2>${line.name}</h2>${this.createStationListInLine(line.stations)}</li>`)
            .join("")}
        </ul>`
      : "";
  };
}
