import { ELEMENT_INFO } from "../util/constants.js";

export default function StationList({ $target }) {
  this.$container = document.createElement("section");
  $target.append(this.$container);

  const { stationDeleteButton } = ELEMENT_INFO;

  this.render = () => {
    this.$container.innerHTML = `
      <h2>🚉 지하철 역 목록</h2>
      <table>
        <thead>
          <tr>
            <th>역 이름</th>
            <th>설정</th>
          </tr>
        </thead>
        </tbody>
          <tr>
            <td>test</td>
            <td><button class="${stationDeleteButton.className}">${stationDeleteButton.text}</button></td>
          </tr>
        </tbody>
      </table>
    `;
  };

  this.render();
}
